import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import routes from '@core/routes';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService, GlobalVariableService} from '@app/_services';
import {first} from 'rxjs/operators';
import {AboutUsDataService} from '@app/shared/_services';
import {TranslateService} from '@ngx-translate/core';
import {MDBModalService} from 'ng-uikit-pro-standard';
import consts from '@core/consts';
import {DropzoneComponent} from 'ngx-dropzone-wrapper';
import {environment} from '@environments/environment';
import {apis} from '@core/apis';
import ext2mime from '@core/ext2mime.json';

@Component({
  selector: 'app-shared-about-us-data',
  templateUrl: './shared-about-us-data.component.html',
  styleUrls: ['./shared-about-us-data.component.scss']
})
export class SharedAboutUsDataComponent implements OnInit {
  @Input() category: string;
  routes = routes;
  form: FormGroup;



  public videoConfig;
  public brochureConfig;
  videoSize: number;
  brochureSize: number;

  @ViewChild('video', { static: false }) videoRef?: DropzoneComponent;
  @ViewChild('brochure', { static: false }) brochureRef?: DropzoneComponent;

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


  constructor(private router: Router,
              private route: ActivatedRoute,
              private title: Title,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private authService: AuthenticationService,
              private modalService: MDBModalService,
              private service: AboutUsDataService,
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
      video: new FormControl('', Validators.required),
      originVideo: new FormControl('', Validators.required),
      brochure: new FormControl('', Validators.required),
      originBrochure: new FormControl('', Validators.required),
    });

    this.videoConfig = {
      url: `${environment.apiUrl}${apis.common.upload}/about-us`,
      // url: `${environment.apiUrl}${apis.common.upload}/${this.category}`,
      acceptedFiles: 'video/*',
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

    this.brochureConfig = {
      url: `${environment.apiUrl}${apis.common.upload}/about-us`,
      // url: `${environment.apiUrl}${apis.common.upload}/${this.category}`,
      acceptedFiles: 'application/pdf',
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

    this.service.load({category: this.category}).pipe(first())
      .subscribe(res => {
        this.loading = false;
        if (res.result == consts.success) {
          const data = res.data;
          this.f.video.patchValue(data.video);
          this.f.originVideo.patchValue(data.originVideo);
          this.videoSize = data.videoSize;
          this.f.brochure.patchValue(data.brochure);
          this.f.originBrochure.patchValue(data.originBrochure);
          this.brochureSize = data.brochureSize;


          setTimeout(() => {
            if (!!data.video && data.video.length > 0) {
              const dropzone = this.videoRef.directiveRef.dropzone();

              const mockFile = { name: data.originVideo, size: this.videoSize };

              const extension = '.' + data.video.split('.').pop();
              dropzone.emit( "addedfile", mockFile );
              dropzone.files.push(mockFile);
              if (ext2mime[extension] && ext2mime[extension].startsWith("image")) {
                dropzone.emit("thumbnail", mockFile, `${environment.assetsBaseUrl}${data.video}`);
              }
              dropzone.emit( "complete", mockFile);
              dropzone.options.maxFiles = 0;
            }
          }, 500);

          setTimeout(() => {
            if (!!data.brochure && data.brochure.length > 0) {
              const dropzone = this.brochureRef.directiveRef.dropzone();

              const mockFile = { name: data.originBrochure, size: this.brochureSize };

              const extension = '.' + data.brochure.split('.').pop();
              dropzone.emit( "addedfile", mockFile );
              dropzone.files.push(mockFile);
              if (ext2mime[extension] && ext2mime[extension].startsWith("image")) {
                dropzone.emit("thumbnail", mockFile, `${environment.assetsBaseUrl}${data.brochure}`);
              }
              dropzone.emit( "complete", mockFile);
              dropzone.options.maxFiles = 0;
            }
          }, 500);
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

    const video = f.video.value;
    const originVideo = f.originVideo.value;
    const videoSize = this.videoSize;
    const brochure = f.brochure.value;
    const originBrochure = f.originBrochure.value;
    const brochureSize = this.brochureSize;

    const data = {
      category: this.category, video, originVideo, videoSize, brochure, originBrochure, brochureSize
    };

    this.loading = true;
    this.alert.show = false;

    this.service.save(data).pipe(first())
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


  public onVideoDropzoneInit(args: any): void {

  }

  public onVideoDropzoneError(args: any): void {
    this.videoSize = 0;
    this.f.video.patchValue(consts.error);
    this.alert = {
      show: true,
      type: 'alert-danger',
      message: this.translate.instant('COMMON.UNKNOWN_SERVER_ERROR'),
    };
  }

  public onVideoDropzoneSuccess(args: any): void {
    this.videoSize = args[0].size;
    const {result, message, filename, oldFilename} = args[1];
    if (result === consts.success) {
      this.alert.show = false;
      this.f.video.patchValue(filename);
      this.f.originVideo.patchValue(oldFilename);
    } else {
      this.f.video.patchValue(consts.error);
      this.alert = {
        show: true,
        type: 'alert-danger',
        message: message,
      };
    }
  }

  onVideoClearClicked() {
    this.videoRef.directiveRef.reset();
    const f = this.f;
    const video = f.video.value;
    const originVideo = f.originVideo.value;
    if (video.length > 0) {
      const dropzone = this.videoRef.directiveRef.dropzone();

      const mockFile = { name: originVideo, size: this.videoSize };
      // dropzone.emit( "removedfile", mockFile );
      // dropzone.emit( "thumbnail", null, null );
      // dropzone.emit( "canceled", mockFile);
      dropzone.emit( "reset", mockFile);
      dropzone.options.maxFiles = 1;
    }

    this.videoRef.directiveRef.reset(true);
    this.f.video.patchValue('');
    this.f.originVideo.patchValue('');
    this.videoSize = 0;
    this.alert.show = false;
  }

  public onBrochureDropzoneInit(args: any): void {

  }

  public onBrochureDropzoneError(args: any): void {
    this.brochureSize = 0;
    this.f.brochure.patchValue(consts.error);
    this.alert = {
      show: true,
      type: 'alert-danger',
      message: this.translate.instant('COMMON.UNKNOWN_SERVER_ERROR'),
    };
  }

  public onBrochureDropzoneSuccess(args: any): void {
    this.brochureSize = args[0].size;
    const {result, message, filename, oldFilename} = args[1];
    if (result === consts.success) {
      this.alert.show = false;
      this.f.brochure.patchValue(filename);
      this.f.originBrochure.patchValue(oldFilename);
    } else {
      this.f.brochure.patchValue(consts.error);
      this.alert = {
        show: true,
        type: 'alert-danger',
        message: message,
      };
    }
  }

  onBrochureClearClicked() {
    this.brochureRef.directiveRef.reset();
    const f = this.f;
    const brochure = f.video.value;
    const originBrochure = f.originBrochure.value;
    if (brochure.length > 0) {
      const dropzone = this.brochureRef.directiveRef.dropzone();

      const mockFile = { name: originBrochure, size: this.brochureSize };
      dropzone.emit( "reset", mockFile);
      dropzone.options.maxFiles = 1;
    }

    this.brochureRef.directiveRef.reset(true);
    this.f.brochure.patchValue('');
    this.f.originBrochure.patchValue('');
    this.brochureSize = 0;
    this.alert.show = false;
  }
}
