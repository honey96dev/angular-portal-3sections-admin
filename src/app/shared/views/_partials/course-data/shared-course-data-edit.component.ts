import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import routes from '@core/routes';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {sprintf} from 'sprintf-js';
import {AuthenticationService, GlobalVariableService} from '@app/_services';
import {first} from 'rxjs/operators';
import {CourseDataService} from '@app/shared/_services';
import {TranslateService} from '@ngx-translate/core';
import {IMyOptions, MDBModalService} from 'ng-uikit-pro-standard';
import {DropzoneComponent} from 'ngx-dropzone-wrapper';
import {environment} from '@environments/environment';
import {apis} from '@core/apis';
import consts from '@core/consts';
import ext2mime from '@core/ext2mime.json';
import {Location} from '@angular/common';

@Component({
  selector: 'app-shared-course-data-edit',
  templateUrl: './shared-course-data-edit.component.html',
  styleUrls: ['./shared-course-data-edit.component.scss']
})
export class SharedCourseDataEditComponent implements OnInit {
  @Input() scope: string;
  @Input() category: string;
  routes = routes;
  form: FormGroup;

  public editableRow: object;
  public config;
  mediaSize: number;

  @ViewChild(DropzoneComponent, { static: false }) mediaRef?: DropzoneComponent;

  heading: string = '';

  loading = false;
  alert = {
    show: false,
    type: '',
    message: '',
  };

  id: string;
  data: any;

  public timestampOptions: IMyOptions = {
// Your options
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private title: Title,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private authService: AuthenticationService,
              private modalService: MDBModalService,
              private service: CourseDataService,
              private location: Location,
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
      id: new FormControl(''),
      nameEn: new FormControl('', Validators.required),
      nameAr: new FormControl('', Validators.required),
      timestamp: new FormControl('', Validators.required),
      summaryEn: new FormControl('', Validators.required),
      summaryAr: new FormControl('', Validators.required),
      titleEn: new FormControl('', Validators.required),
      titleAr: new FormControl('', Validators.required),
      descriptionEn: new FormControl('', Validators.required),
      descriptionAr: new FormControl('', Validators.required),
      media: new FormControl('', Validators.required),
      originMedia: new FormControl('', Validators.required),
    });

    if (this.scope === consts.upcoming) {
      this.heading = this.translate.instant('BUSINESS_LAYOUT.UPCOMING');
    } else {
      this.heading = this.translate.instant('BUSINESS_LAYOUT.PREVIOUS');
    }
    this.config = {
      url: `${environment.apiUrl}${apis.common.upload}/courses`,
      // url: `${environment.apiUrl}${apis.common.upload}/${this.category}`,
      acceptedFiles: 'image/*,video/*',
      maxmediaSize: consts.uploadMaxsize,
      clickable: true,
      maxFiles: 1,
      autoReset: null,
      errorReset: null,
      cancelReset: null,
      headers: {
        Authorization: `Bearer ${this.authService.currentUserValue.token}`,
        language: this.translate.instant('LANG'),
      },
    };

    this.route.paramMap.subscribe(map => {
      this.id = map.get('id');
      this.f['id'].patchValue(this.id);
      if (this.id) {
        this.service.get({id: this.id}).pipe(first())
          .subscribe(res => {
            const {result, data} = res;
            if (result == consts.success) {
              this.data = data;
              this.f['id'].patchValue(data.id);
              this.f['nameEn'].patchValue(data.nameEn);
              this.f['nameAr'].patchValue(data.nameAr);
              this.f['timestamp'].patchValue(data.timestamp);
              this.f['summaryEn'].patchValue(data.summaryEn);
              this.f['summaryAr'].patchValue(data.summaryAr);
              this.f['titleEn'].patchValue(data.titleEn);
              this.f['titleAr'].patchValue(data.titleAr);
              this.f['descriptionEn'].patchValue(data.descriptionEn);
              this.f['descriptionAr'].patchValue(data.descriptionAr);
              this.f['media'].patchValue(data.media);
              this.f['originMedia'].patchValue(data.originMedia);
              setTimeout(() => {
                const dropzone = this.mediaRef.directiveRef.dropzone();

                const mockFile = { name: data.originMedia, size: data.mediaSize };

                // const extension = path.extname(row.media);
                const extension = '.' + data.media.split('.').pop();
                dropzone.emit( "addedfile", mockFile );
                dropzone.files.push(mockFile);
                if (ext2mime[extension] && ext2mime[extension].startsWith("image")) {
                  dropzone.emit("thumbnail", mockFile, `${environment.assetsBaseUrl}${data.media}`);
                }
                dropzone.emit( "complete", mockFile);
                dropzone.options.maxFiles = 0;
                this.mediaSize = data.mediaSize;
              }, 500);
            } else {
              this.data = null;
            }
          });
      }
    });
  }

  get f() {
    return this.form.controls;
  }

  closeAlert() {
    this.alert.show = false;
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    // console.log('submit');
    const category = this.category;
    const f = this.f;
    const id = f.id.value;
    const nameEn = f.nameEn.value;
    const nameAr = f.nameAr.value;
    const timestamp = f.timestamp.value;
    const summaryEn = f.summaryEn.value;
    const summaryAr = f.summaryAr.value;
    const titleEn = f.titleEn.value;
    const titleAr = f.titleAr.value;
    const descriptionEn = f.descriptionEn.value;
    const descriptionAr = f.descriptionAr.value;
    const media = f.media.value;
    const originMedia = f.originMedia.value;
    const mediaSize = this.mediaSize;

    const data = {
      id, category, nameEn, nameAr, timestamp, titleEn, titleAr, summaryEn, summaryAr, descriptionEn, descriptionAr, media, originMedia, mediaSize
    };

    this.loading = true;
    this.alert.show = false;

    this.service.edit(data).pipe(first())
      .subscribe(res => {
        this.loading = false;
        if (res.result == consts.success) {
          this.alert = {
            show: true,
            type: 'alert-success',
            message: res.message,
          };
          f.id.patchValue(res.data.insertId);
          // this.globalVariableService.setNavbarTitle(`${strings.registerBots} - ${strings.edit}`);
          // this.router.navigate([this.returnUrl]);
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

  public onDropzoneInit(args: any): void {
    console.log('onUploadInit:', args);

  }

  public onDropzoneError(args: any): void {
    console.log('onUploadError:', args);
    this.mediaSize = 0;
    this.f.media.patchValue(consts.error);this.alert = {
      show: true,
      type: 'alert-danger',
      message: this.translate.instant('COMMON.UNKNOWN_SERVER_ERROR'),
    };
  }

  public onDropzoneSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
    this.mediaSize = args[0].size;
    const {result, message, filename, oldFilename} = args[1];
    if (result === consts.success) {
      this.alert.show = false;
      this.f.media.patchValue(filename);
      this.f.originMedia.patchValue(oldFilename);
    } else {
      this.f.media.patchValue(consts.error);
      this.alert = {
        show: true,
        type: 'alert-danger',
        message: message,
      };
    }
  }

  onClearMediaClicked() {
    const row = this.service.editableRowValue();
    this.mediaRef.directiveRef.reset();
    if (!!row.id && row.media.length > 0) {
      const dropzone = this.mediaRef.directiveRef.dropzone();

      const mockFile = { name: row.originMedia, size: row.mediaSize };
      // dropzone.emit( "removedfile", mockFile );
      // dropzone.emit( "thumbnail", null, null );
      // dropzone.emit( "canceled", mockFile);
      dropzone.emit( "reset", mockFile);
      dropzone.options.maxFiles = 1;
    }

    // this.mediaRef.directiveRef.reset();
    this.mediaRef.directiveRef.reset(true);
    // this.mediaRef.directiveRef.dropzone();
    // console.log(this.mediaRef.directiveRef.dropzone());
    this.f.media.patchValue('');
    this.f.originMedia.patchValue('');
    this.mediaSize = 0;
    this.alert.show = false;
  }
}
