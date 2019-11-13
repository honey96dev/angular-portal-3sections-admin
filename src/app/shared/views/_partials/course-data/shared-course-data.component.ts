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
import {CourseDataService} from '@app/shared/_services';
import {QuestionModalComponent} from '@app/shared/views/_partials/common-dialogs/question/question-modal.component';

@Component({
  selector: 'app-shared-course-data',
  templateUrl: './shared-course-data.component.html',
  styleUrls: ['./shared-course-data.component.scss']
})
export class SharedCourseDataComponent implements OnInit {
  @Input() scope: string;
  @Input() category: string;
  routes = routes;
  lang: string = '';

  error = '';
  alert = {
    show: false,
    type: '',
    message: '',
  };
  addButtonEnabled: boolean = true;

  elements: any = [];
  previous: string;
  headElements = [
    '',
    this.translate.instant('BUSINESS_COURSES.NAME'),
    this.translate.instant('BUSINESS_COURSES.TIMESTAMP'),
    this.translate.instant('BUSINESS_COURSES.TITLE'),
    this.translate.instant('BUSINESS_COURSES.SUMMARY'),
    this.translate.instant('BUSINESS_COURSES.DESCRIPTION'),
    // this.translate.instant('BUSINESS_COURSES.MEDIA'),
    this.translate.instant('BUSINESS_COURSES.INSTRUCTORS'),
    this.translate.instant('BUSINESS_COURSES.APPLICANTS'),
  ];

  heading: string = '';

  instructorsUrl: string = '';
  applicantsUrl: string = '';
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
                     private service: CourseDataService,
                     private formBuilder: FormBuilder,
                     private cdRef: ChangeDetectorRef
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

    this.instructorsUrl = sprintf('/%s/%s', this.category, routes._partials.courseInstructors.main);
    this.applicantsUrl = sprintf("/%s/%s", this.category, routes._partials.courseJoin);
    if (this.scope === consts.upcoming) {
      this.heading = this.translate.instant('BUSINESS_LAYOUT.UPCOMING');
      this.addUrl = sprintf("/%s/%s", this.category, routes._partials.upcomingCourses.edit);
      this.editUrl = sprintf("/%s/%s", this.category, routes._partials.upcomingCourses.edit);
    } else {
      this.heading = this.translate.instant('BUSINESS_LAYOUT.PREVIOUS');
      this.addUrl = sprintf("/%s/%s", this.category, routes._partials.previousCourses.edit);
      this.editUrl = sprintf("/%s/%s", this.category, routes._partials.previousCourses.edit);
    }

    this.loadData();

    this.mdbTablePagination.activePageNumber = this.service.currentPageValue(this.scope);
    this.route.paramMap.subscribe(map => {
      const page = map.get('page');
      if (page) {
        this.mdbTablePagination.activePageNumber = parseInt(page);
      }
    });
    this.mdbTablePagination.paginationChange().subscribe(res => {
      this.service.setCurrentPage(this.scope, this.mdbTablePagination.activePageNumber);
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

  loadData() {
    this.service.list({scope: this.scope, category: this.category}).pipe(first())
      .subscribe(res => {
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
    this.modalRef.content.message = this.translate.instant('COMMON.DELETE_CONFIRM_MSG', {item: this.lang == 'en' ? el.nameEn : el.nameAr});
    this.modalRef.content.yesButtonColor = 'danger';
    this.modalRef.content.yesButtonClicked.subscribe(() => {
      el['scope'] = this.scope;
      this.service.delete(el).pipe(first())
        .subscribe(res => {
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
