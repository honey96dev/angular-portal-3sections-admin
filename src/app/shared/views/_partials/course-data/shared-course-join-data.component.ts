import {ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'ng-uikit-pro-standard';
import {first} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import consts from '@core/consts';
import routes from '@core/routes';
import {AuthenticationService, GlobalVariableService} from '@app/_services';
import {CourseDataService} from '@app/shared/_services';
import {ExcelService} from '@app/_services/excel-service';
import html2canvas from 'html2canvas';
import {sprintf} from 'sprintf-js';
import {Location} from '@angular/common';
import {QuestionModalComponent} from '@app/shared/views/_partials/common-dialogs/question/question-modal.component';

@Component({
  selector: 'app-shared-course-join-data',
  templateUrl: './shared-course-join-data.component.html',
  styleUrls: ['./shared-course-join-data.component.scss']
})
export class SharedCourseJoinDataComponent implements OnInit {
  @Input() category: string;
  routes = routes;
  lang: string = '';
  loading = false;
  error = '';
  alert = {
    show: false,
    type: '',
    message: '',
  };
  buttonEnabled: boolean = true;

  data: any;
  elements: any = [];
  previous: string;
  headElements = [
    '',
    this.translate.instant('SHARED_EVENT_JOIN.EMAIL'),
    this.translate.instant('SHARED_EVENT_JOIN.FIRST_NAME'),
    this.translate.instant('SHARED_EVENT_JOIN.FATHER_NAME'),
    this.translate.instant('SHARED_EVENT_JOIN.LAST_NAME'),
    this.translate.instant('SHARED_EVENT_JOIN.JOB_TITLE'),
    this.translate.instant('SHARED_EVENT_JOIN.SECTOR'),
    this.translate.instant('SHARED_EVENT_JOIN.COMPANY'),
    this.translate.instant('SHARED_EVENT_JOIN.CITY'),
    this.translate.instant('SHARED_EVENT_JOIN.PHONE'),
    this.translate.instant('SHARED_EVENT_JOIN.QRCODE'),
    this.translate.instant('SHARED_EVENT_JOIN.PAY'),
  ];

  target: string;

  searchText: string = '';

  maxVisibleItems: number = 8;
  modalRef: MDBModalRef;

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  public constructor(private router: Router,
                     private route: ActivatedRoute,
                     private title: Title,
                     private globalVariableService: GlobalVariableService,
                     private translate: TranslateService,
                     private authService: AuthenticationService,
                     private modalService: MDBModalService,
                     private service: CourseDataService,
                     private formBuilder: FormBuilder,
                     private cdRef: ChangeDetectorRef,
                     private excelService: ExcelService,
                     private location: Location
  ) {

  }

  ngOnInit() {
    this.lang = this.translate.instant('LANG');
    let title;
    switch (this.category) {
      case 'human':
        title = this.translate.instant('HOME_FRONT.HUMAN_CAPITAL') + ' - ' + this.translate.instant('SITE_NAME');
        break;
      case 'conference':
        title = this.translate.instant('HOME_FRONT.CONFERENCE') + ' - ' + this.translate.instant('SITE_NAME');
        break;
      case 'business':
        title = this.translate.instant('HOME_FRONT.BUSINESS_SOLUTION') + ' - ' + this.translate.instant('SITE_NAME');
        break;
    }
    this.title.setTitle(title);
    this.globalVariableService.getLanguage()
      .subscribe(data => {
        this.title.setTitle(title);
      });

    this.route.paramMap.subscribe(map => {
      this.target = map.get('id');
      this.service.get({id: this.target}).pipe(first())
        .subscribe(res => {
          const {result, data} = res;
          if (result == consts.success) {
            this.data = data;
          } else {
            this.data = null;
          }
          this.loadData();
        });
    });

  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  closeAlert() {
    this.alert.show = false;
  }

  goBack(params) {
    this.location.back();
  }

  loadData() {
    this.service.applicants({target: this.target}).pipe(first())
      .subscribe(res => {
        this.loading = false;
        if (res.result == consts.success) {
          let arr = [];
          for (let item of res.data) {
            arr = [consts.course, item['id'], item['userId'], item['email'], item['hash']];
            // arr = [item['id'], item['firstName'], item['lastName'], item['country'], item['city'], item['company'], item['job'], item['email'], item['phone'], item['attend']];
            item['code'] = arr.join('@@');
            item['showCode'] = false;
            // item['hover'] = '<ngx-qrcode qrc-element-type="url" width="128" qrc-value = "' + item['code'] + '"></ngx-qrcode>';
          }
          this.elements = res.data;
          if (this.elements.length === 0) {
            this.alert = {
              show: true,
              type: 'alert-warning',
              message: this.translate.instant('COMMON.NO_DATA'),
            };
          }
          this.mdbTable.setDataSource(this.elements);
          this.elements = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
        } else {
          this.elements = [];
          this.alert = {
            show: true,
            type: 'alert-danger',
            message: res.message,
          };
        }
      }, error => {
        this.loading = false;
        this.elements = [];
        this.alert = {
          show: true,
          type: 'alert-danger',
          message: this.translate.instant('COMMON.UNKNOWN_SERVER_ERROR'),
        };
      });
  }


  editItem(el: any) {
    let elementIndex = -1;
    if (el) {
      elementIndex = this.elements.findIndex((elem: any) => el === elem);
    }
    this.service.setEditableRow(el);
  }

  removeItem(el: any) {
    const modalOptions = {
      class: 'modal-dialog-centered',
    };

    this.modalRef = this.modalService.show(QuestionModalComponent, modalOptions);
    this.modalRef.content.title = this.translate.instant('COMMON.DELETE');
    this.modalRef.content.message = this.translate.instant('COMMON.DELETE_CONFIRM_MSG', {item: el.email});
    this.modalRef.content.yesButtonColor = 'danger';
    this.modalRef.content.yesButtonClicked.subscribe(() => {
      this.service.deleteApplicant({...el, target: this.target}).pipe(first())
        .subscribe(res => {
          this.loading = false;
          if (res.result == consts.success) {
            this.elements = res.data;
            this.mdbTable.setDataSource(this.elements);
            this.elements = this.mdbTable.getDataSource();
            this.previous = this.mdbTable.getDataSource();
          } else {
            this.alert = {
              show: true,
              type: 'alert-danger',
              message: res.message,
            };
          }
        }, error => {
          this.loading = false;
          this.alert = {
            show: true,
            type: 'alert-danger',
            message: this.translate.instant('COMMON.UNKNOWN_SERVER_ERROR'),
          };
        });
    });
  }

  exportData() {
    let data = [];
    let attend;
    for (let element of this.elements) {
      attend = element['attend'] == 1 ? 'COMMON.YES' : 'COMMON.NO';
      data.push({
        [this.translate.instant('SHARED_EVENT_JOIN.FIRST_NAME')]: element['firstName'],
        [this.translate.instant('SHARED_EVENT_JOIN.LAST_NAME')]: element['lastName'],
        [this.translate.instant('SHARED_EVENT_JOIN.COUNTRY')]: element['country'],
        [this.translate.instant('SHARED_EVENT_JOIN.CITY')]: element['city'],
        [this.translate.instant('SHARED_EVENT_JOIN.COMPANY')]: element['company'],
        [this.translate.instant('SHARED_EVENT_JOIN.JOB_TITLE')]: element['jobTitle'],
        [this.translate.instant('SHARED_EVENT_JOIN.EMAIL')]: element['email'],
        [this.translate.instant('SHARED_EVENT_JOIN.PHONE')]: element['phone'],
        [this.translate.instant('SHARED_EVENT_JOIN.PAY')]: !!element['paid'] ? this.translate.instant('SHARED_EVENT_JOIN.PAID') : this.translate.instant('SHARED_EVENT_JOIN.NOT_PAID'),
        [this.translate.instant('SHARED_EVENT_JOIN.ATTEND')]: this.translate.instant(attend),
      });
    }
    this.excelService.exportAsExcelFile(data, this.lang == 'en' ? this.data.nameEn : this.data.nameAr);
  }

  togglePaid(el, attend) {
    el['paid'] = attend;
    el['target'] = this.target;

    this.service.paid(el).pipe(first())
      .subscribe(res => {
        this.loadData();
      }, error => {
        this.loading = false;
        this.elements = [];
        this.alert = {
          show: true,
          type: 'alert-danger',
          message: this.translate.instant('COMMON.UNKNOWN_SERVER_ERROR'),
        };
      });
  }

  toggleAttend(el, attend) {
    el['attend'] = attend;
    el['target'] = this.target;

    this.service.attend(el).pipe(first())
      .subscribe(res => {
        this.loadData();
      }, error => {
        this.loading = false;
        this.elements = [];
        this.alert = {
          show: true,
          type: 'alert-danger',
          message: this.translate.instant('COMMON.UNKNOWN_SERVER_ERROR'),
        };
      });
  }

  download(el) {
    const self =  this;
    // let element = document.querySelector("body");
    let element = document.querySelector(sprintf("#qrcode%d .qrcode img", el.id));
    html2canvas(element).then((canvas) => {
      // Convert the canvas to blob
      canvas.toBlob((blob) => {
        // To download directly on browser default 'downloads' location
        let link = document.createElement("a");
        link.download = sprintf("%s - %s %s", self.translate.instant('LANG') == 'en' ? self.data.nameEn : self.data.nameAr, el['firstName'], el['lastName']);
        link.href = URL.createObjectURL(blob);
        link.click();

        // To save manually somewhere in file explorer
        // window.saveAs(blob, link.download);

      },'image/png');
    });
  }

  toggleCode(el, show) {
    for (let element of this.elements) {
      element['showCode'] = false;
    }
    el['showCode'] = show;
  }

  barcode() {

  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }

  onRowCreate($event) {

  }

  onRowRemove($event) {

  }
}
