import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import routes from '@core/routes';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {sprintf} from 'sprintf-js';
import {AuthenticationService, GlobalVariableService} from '@app/_services';
import {first} from 'rxjs/operators';
import {EventsDataService} from '@app/shared/_services';
import {TranslateService} from '@ngx-translate/core';
import {IMyOptions, MDBModalService} from 'ng-uikit-pro-standard';
import {DropzoneComponent, DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {environment} from '@environments/environment';
import {apis} from '@core/apis';
import consts from '@core/consts';
import ext2mime from '@core/ext2mime.json';
import {Location} from '@angular/common';

@Component({
  selector: 'app-shared-events-data-edit',
  templateUrl: './shared-events-data-edit.component.html',
  styleUrls: ['./shared-events-data-edit.component.scss']
})
export class SharedEventsDataEditComponent implements OnInit {
  @Input() scope: string;
  @Input() category: string;
  routes = routes;
  form: FormGroup;

  public editableRow: object;
  public config;
  mediaSize: number;

  public timestampOptions: IMyOptions = {
// Your options
  };

  @ViewChild(DropzoneComponent, { static: false }) mediaRef?: DropzoneComponent;

  heading: string = '';

  loading = false;
  alert = {
    show: false,
    type: '',
    message: '',
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private title: Title,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private authService: AuthenticationService,
              private modalService: MDBModalService,
              private service: EventsDataService,
              private formBuilder: FormBuilder,
              private location: Location) {
  }

  ngOnInit() {
    const row = this.service.editableRowValue();
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
      typeEn: new FormControl('', Validators.required),
      typeAr: new FormControl('', Validators.required),
      nameEn: new FormControl('', Validators.required),
      nameAr: new FormControl('', Validators.required),
      timestamp: new FormControl('', Validators.required),
      titleEn: new FormControl('', Validators.required),
      titleAr: new FormControl('', Validators.required),
      descriptionEn: new FormControl('', Validators.required),
      descriptionAr: new FormControl('', Validators.required),
      media: new FormControl('', Validators.required),
      originMedia: new FormControl('', Validators.required),
    });

    this.f['id'].patchValue(null);
    if (row) {
      this.f['id'].patchValue(row.id);
      this.f['typeEn'].patchValue(row.typeEn);
      this.f['typeAr'].patchValue(row.typeAr);
      this.f['nameEn'].patchValue(row.nameEn);
      this.f['nameAr'].patchValue(row.nameAr);
      this.f['timestamp'].patchValue(row.timestamp);
      this.f['titleEn'].patchValue(row.titleEn);
      this.f['titleAr'].patchValue(row.titleAr);
      this.f['descriptionEn'].patchValue(row.descriptionEn);
      this.f['descriptionAr'].patchValue(row.descriptionAr);
      this.f['media'].patchValue(row.media);
      this.f['originMedia'].patchValue(row.originMedia);
    }

    if (this.scope === consts.upcoming) {
      this.heading = this.translate.instant('CONFERENCE_LAYOUT.UPCOMING_EVENTS');
    } else {
      this.heading = this.translate.instant('CONFERENCE_LAYOUT.PREVIOUS_EVENTS');
    }
    this.config = {
      url: `${environment.apiUrl}${apis.common.upload}/previous-events`,
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
    const {scope, category} = this;
    const f = this.f;
    const id = f.id.value;
    const typeEn = f.typeEn.value;
    const typeAr = f.typeAr.value;
    const nameEn = f.nameEn.value;
    const nameAr = f.nameAr.value;
    const timestamp = f.timestamp.value;
    const titleEn = f.titleEn.value;
    const titleAr = f.titleAr.value;
    const descriptionEn = f.descriptionEn.value;
    const descriptionAr = f.descriptionAr.value;
    const media = f.media.value;
    const originMedia = f.originMedia.value;
    const mediaSize = this.mediaSize;

    const data = {
      scope, id, category, typeEn, typeAr, nameEn, nameAr, timestamp, titleEn, titleAr, descriptionEn, descriptionAr, media, originMedia, mediaSize
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
    setTimeout(() => {
      const row = this.service.editableRowValue();
      if (!!row && !!row.id && row.media.length > 0) {
        const dropzone = this.mediaRef.directiveRef.dropzone();

        const mockFile = { name: row.originMedia, size: row.mediaSize };

        // const extension = path.extname(row.media);
        const extension = '.' + row.media.split('.').pop();
        dropzone.emit( "addedfile", mockFile );
        dropzone.files.push(mockFile);
        if (ext2mime[extension] && ext2mime[extension].startsWith("image")) {
          dropzone.emit("thumbnail", mockFile, `${environment.assetsBaseUrl}${row.media}`);
        }
        dropzone.emit( "complete", mockFile);
        dropzone.options.maxFiles = 0;
        this.mediaSize = row.mediaSize;
      }
    }, 500);

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
