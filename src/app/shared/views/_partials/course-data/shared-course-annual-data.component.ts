import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import routes from '@core/routes';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService, GlobalVariableService} from '@app/_services';
import {first} from 'rxjs/operators';
import {MediaSliderDataService, TrainingDataService} from '@app/shared/_services';
import {TranslateService} from '@ngx-translate/core';
import {IMyOptions, MDBModalService} from 'ng-uikit-pro-standard';
import consts from '@core/consts';

@Component({
  selector: 'app-shared-course-annual-data',
  templateUrl: './shared-course-annual-data.component.html',
  styleUrls: ['./shared-course-annual-data.component.scss']
})
export class SharedCourseAnnualDataComponent implements OnInit {
  @Input() category: string;
  routes = routes;
  form: FormGroup;

  // public editableRow: object;
  // public config;
  // mediaSize: number;
  //
  // @ViewChild(DropzoneComponent, { static: false }) mediaRef?: DropzoneComponent;

  loading = false;
  alert = {
    show: false,
    type: '',
    message: '',
  };
//
//   public timestampOptions: IMyOptions = {
// // Your options
//   };

  minYear = 2019;
  maxYear = 2099;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private title: Title,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private authService: AuthenticationService,
              private modalService: MDBModalService,
              private service: TrainingDataService,
              private formBuilder: FormBuilder,) {
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
      year: new FormControl('', [Validators.required, Validators.min(this.minYear), Validators.max(this.maxYear)]),
      summaryEn: new FormControl('', Validators.required),
      summaryAr: new FormControl('', Validators.required),
    });

    //
    // this.config = {
    //   url: `${environment.apiUrl}${apis.common.upload}/media-slider`,
    //   // url: `${environment.apiUrl}${apis.common.upload}/${this.category}`,
    //   acceptedFiles: 'image/*,video/*',
    //   maxmediaSize: consts.uploadMaxsize,
    //   clickable: true,
    //   maxFiles: 1,
    //   autoReset: null,
    //   errorReset: null,
    //   cancelReset: null,
    //   headers: {
    //     Authorization: `Bearer ${this.authService.currentUserValue.token}`,
    //     language: this.translate.instant('LANG'),
    //   },
    // };

    this.loadData();
  }

  get f() {
    return this.form.controls;
  }

  closeAlert() {
    this.alert.show = false;
  }

  loadData() {
    this.loading = true;
    this.alert.show = false;

    this.service.loadAnnualSettings({}).pipe(first())
      .subscribe(res => {
        this.loading = false;
        if (res.result == consts.success) {
          this.f.year.patchValue(res.data['annual-upcoming-year']);
          this.f.summaryEn.patchValue(res.data['annual-upcoming-summary-en']);
          this.f.summaryAr.patchValue(res.data['annual-upcoming-summary-ar']);
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

  onSubmit() {
    const f = this.f;
    const year = f.year.value;
    const summaryEn = f.summaryEn.value;
    const summaryAr = f.summaryAr.value;

    const data = {
      year, summaryEn, summaryAr,
    };

    this.loading = true;
    this.alert.show = false;

    this.service.saveAnnualSettings(data).pipe(first())
      .subscribe(res => {
        this.loading = false;
        if (res.result == consts.success) {
          this.alert = {
            show: true,
            type: 'alert-success',
            message: res.message,
          };
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
}
