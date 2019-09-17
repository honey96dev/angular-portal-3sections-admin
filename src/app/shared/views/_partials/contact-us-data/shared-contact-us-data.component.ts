import {ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'ng-uikit-pro-standard';
import {first} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {sprintf} from 'sprintf-js';
import consts from '@core/consts';
import routes from '@core/routes';
import {AuthenticationService, GlobalVariableService} from '@app/_services';
import {ContactUsDataService} from '@app/shared/_services';
import {QuestionModalComponent} from '@app/shared/views/_partials/common-dialogs/question/question-modal.component';

@Component({
  selector: 'app-shared-contact-us-data',
  templateUrl: './shared-contact-us-data.component.html',
  styleUrls: ['./shared-contact-us-data.component.scss']
})
export class SharedContactUsDataComponent implements OnInit {
  @Input() category: string;
  routes = routes;
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  alert = {
    show: false,
    type: '',
    message: '',
  };
  addButtonEnabled: boolean = true;

  elements: any = [];
  previous: string;
  headElements = ['', 'Name', 'Email', 'Subject', 'Message'];

  addUrl: string = '';
  editUrl: string = '';
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
                     private service: ContactUsDataService,
                     private formBuilder: FormBuilder,
                     private cdRef: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
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

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.addUrl = sprintf("/%s/%s", this.category, routes._partials.contactUs.edit);
    this.editUrl = sprintf("/%s/%s", this.category, routes._partials.contactUs.edit);
    this.loadData();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  get f() {
    return this.form.controls;
  }

  closeAlert() {
    this.alert.show = false;
  }

  loadData() {
    this.service.list({category: this.category}).pipe(first())
      .subscribe(res => {
        this.loading = false;
        if (res.result == consts.success) {
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
  }

  editItem(el: any) {
    let elementIndex = -1;
    if (el) {
      elementIndex = this.elements.findIndex((elem: any) => el === elem);
    }
    this.service.setEditableRow(el);
    // const modalOptions = {
    //   data: {
    //     editableRow: el
    //   },
    //   class: 'wide-modal',
    // };
    // this.modalRef = this.modalService.show(RegisterBotsModalComponent, modalOptions);
    // this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
    //   this.elements[elementIndex] = newElement;
    // });
    // this.mdbTable.setDataSource(this.elements);
    // console.log(url);
    // this.router.navigate([url]);
  }

  removeItem(el: any) {
    const modalOptions = {
      class: 'modal-dialog-centered',
    };

    this.modalRef = this.modalService.show(QuestionModalComponent, modalOptions);
    this.modalRef.content.title = this.translate.instant('COMMON.DELETE');
    this.modalRef.content.message = this.translate.instant('COMMON.DELETE_CONFIRM_MSG', {item: el.name});
    this.modalRef.content.yesButtonColor = 'danger';
    this.modalRef.content.yesButtonClicked.subscribe(() => {
      this.service.delete(el).pipe(first())
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

  emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
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
