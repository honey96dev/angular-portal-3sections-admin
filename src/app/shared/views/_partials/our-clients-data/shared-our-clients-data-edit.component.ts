import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import routes from '@core/routes';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {sprintf} from 'sprintf-js';
import {AuthenticationService, GlobalVariableService} from '@app/_services';
import {first} from 'rxjs/operators';
import {OurClientsDataService} from '@app/shared/_services';
import {TranslateService} from '@ngx-translate/core';
import {IMyOptions, MDBModalService} from 'ng-uikit-pro-standard';
import {DropzoneComponent} from 'ngx-dropzone-wrapper';
import {environment} from '@environments/environment';
import {apis} from '@core/apis';
import consts from '@core/consts';
import ext2mime from '@core/ext2mime.json';
import {StarRatingComponent} from 'ng-starrating';

@Component({
  selector: 'app-shared-our-clients-data-edit',
  templateUrl: './shared-our-clients-data-edit.component.html',
  styleUrls: ['./shared-our-clients-data-edit.component.scss']
})
export class SharedOurClientsDataEditComponent implements OnInit {
  @Input() category: string;
  routes = routes;
  form: FormGroup;

  public editableRow: object;
  public photoConfig;
  photoMediaSize: number;
  public filesConfig;
  filesMediaSize: number[];

  public timestampOptions: IMyOptions = {
// Your options
  };

  @ViewChild(DropzoneComponent, { static: false }) photoMediaRef?: DropzoneComponent;

  backUrl: string = '';

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
              private service: OurClientsDataService,
              private formBuilder: FormBuilder,) {
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
      timestamp: new FormControl('', Validators.required),
      nameEn: new FormControl('', Validators.required),
      nameAr: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required),
      photoOriginMedia: new FormControl('', Validators.required),
      // stars: new FormControl('', Validators.required),
      // feedbackEn: new FormControl('', Validators.required),
      // feedbackAr: new FormControl('', Validators.required),
      // files: new FormControl(''),
      // originMedia: new FormControl('', Validators.required),
      titleEn: new FormControl('', Validators.required),
      titleAr: new FormControl('', Validators.required),
      descriptionEn: new FormControl('', Validators.required),
      descriptionAr: new FormControl('', Validators.required),
      durationEn: new FormControl('', Validators.required),
      durationAr: new FormControl('', Validators.required),
      scopeEn: new FormControl('', Validators.required),
      scopeAr: new FormControl('', Validators.required),
      deliverableEn: new FormControl('', Validators.required),
      deliverableAr: new FormControl('', Validators.required),
    });

    this.f['id'].patchValue(row.id);
    this.f['timestamp'].patchValue(row.timestamp);
    this.f['nameEn'].patchValue(row.nameEn);
    this.f['nameAr'].patchValue(row.nameAr);
    this.f['photo'].patchValue(row.photo);
    this.f['photoOriginMedia'].patchValue(row.photoOriginMedia);
    this.f['titleEn'].patchValue(row.titleEn);
    this.f['titleAr'].patchValue(row.titleAr);
    this.f['descriptionEn'].patchValue(row.descriptionEn);
    this.f['descriptionAr'].patchValue(row.descriptionAr);
    this.f['durationEn'].patchValue(row.durationEn);
    this.f['durationAr'].patchValue(row.durationAr);
    this.f['scopeEn'].patchValue(row.scopeEn);
    this.f['scopeAr'].patchValue(row.scopeAr);
    this.f['deliverableEn'].patchValue(row.deliverableEn);
    this.f['deliverableAr'].patchValue(row.deliverableAr);
    // this.f['stars'].patchValue(row.stars);
    // this.f['feedbackEn'].patchValue(row.feedbackEn);
    // this.f['feedbackAr'].patchValue(row.feedbackAr);
    // this.f['files'].patchValue(row.files);

    this.backUrl = sprintf("/%s/%s", this.category, routes._partials.ourClients.main);
    this.photoConfig = {
      url: `${environment.apiUrl}${apis.common.upload}/our-clients`,
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

  onSubmit() {
    // console.log('submit');
    const category = this.category;
    const f = this.f;
    const id = f.id.value;
    const timestamp = f.timestamp.value;
    const nameEn = f.nameEn.value;
    const nameAr = f.nameAr.value;
    const photo = f.photo.value;
    const photoOriginMedia = f.photoOriginMedia.value;
    const photoMediaSize = this.photoMediaSize;
    // const stars = f.stars.value;
    // const feedbackEn = f.feedbackEn.value;
    // const feedbackAr = f.feedbackAr.value;
    const titleEn = f.titleEn.value;
    const titleAr = f.titleAr.value;
    const descriptionEn = f.descriptionEn.value;
    const descriptionAr = f.descriptionAr.value;
    const durationEn = f.durationEn.value;
    const durationAr = f.durationAr.value;
    const scopeEn = f.scopeEn.value;
    const scopeAr = f.scopeAr.value;
    const deliverableEn = f.deliverableEn.value;
    const deliverableAr = f.deliverableAr.value;

    const data = {
      id, category, timestamp, nameEn, nameAr, photo, photoOriginMedia, photoMediaSize, titleEn, titleAr, descriptionEn, descriptionAr, durationEn, durationAr, scopeEn, scopeAr, deliverableEn, deliverableAr,
      // id, category, timestamp, nameEn, nameAr, photo, photoOriginMedia, photoMediaSize, stars, feedbackEn, feedbackAr
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

  public onPhotoDropzoneInit(args: any): void {
    console.log('onUploadInit:', args);
    setTimeout(() => {
      const row = this.service.editableRowValue();
      if (!!row.id && row.photo.length > 0) {
        const dropzone = this.photoMediaRef.directiveRef.dropzone();

        const mockFile = { name: row.photoOriginMedia, size: row.photoMediaSize };

        // const extension = path.extname(row.media);
        const extension = '.' + row.photo.split('.').pop();
        dropzone.emit( "addedfile", mockFile );
        dropzone.files.push(mockFile);
        if (ext2mime[extension] && ext2mime[extension].startsWith("image")) {
          dropzone.emit("thumbnail", mockFile, `${environment.assetsBaseUrl}${row.photo}`);
        }
        dropzone.emit( "complete", mockFile);
        dropzone.options.maxFiles = 0;
        this.photoMediaSize = row.photoMediaSize;
      }
    }, 500);

  }

  public onPhotoDropzoneError(args: any): void {
    console.log('onUploadError:', args);
    this.photoMediaSize = 0;
    this.f.photo.patchValue(consts.error);
    this.alert = {
      show: true,
      type: 'alert-danger',
      message: this.translate.instant('COMMON.UNKNOWN_SERVER_ERROR'),
    };
  }

  public onPhotoDropzoneSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
    this.photoMediaSize = args[0].size;
    const {result, message, filename, oldFilename} = args[1];
    if (result === consts.success) {
      this.alert.show = false;
      this.f.photo.patchValue(filename);
      this.f.photoOriginMedia.patchValue(oldFilename);
    } else {
      this.f.photo.patchValue(consts.error);
      this.alert = {
        show: true,
        type: 'alert-danger',
        message: message,
      };
    }
  }

  onClearPhotoMediaClicked() {
    const row = this.service.editableRowValue();
    this.photoMediaRef.directiveRef.reset();
    if (!!row.id && row.photo.length > 0) {
      const dropzone = this.photoMediaRef.directiveRef.dropzone();

      const mockFile = { name: row.photoOriginMedia, size: row.photoMediaSize };
      // dropzone.emit( "removedfile", mockFile );
      // dropzone.emit( "thumbnail", null, null );
      // dropzone.emit( "canceled", mockFile);
      dropzone.emit( "reset", mockFile);
      dropzone.options.maxFiles = 1;
    }

    // this.mediaRef.directiveRef.reset();
    this.photoMediaRef.directiveRef.reset(true);
    // this.mediaRef.directiveRef.dropzone();
    // console.log(this.mediaRef.directiveRef.dropzone());
    this.f.photo.patchValue('');
    this.f.photoOriginMedia.patchValue('');
    this.photoMediaSize = 0;
    this.alert.show = false;
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    // alert(`Old Value:${$event.oldValue},
    //   New Value: ${$event.newValue},
    //   Checked Color: ${$event.starRating.checkedcolor},
    //   Unchecked Color: ${$event.starRating.uncheckedcolor}`);
    this.f.stars.patchValue($event.newValue);
  }
}
