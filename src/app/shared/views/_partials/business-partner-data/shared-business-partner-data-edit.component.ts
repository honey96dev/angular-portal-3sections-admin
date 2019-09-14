import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import routes from '@core/routes';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {sprintf} from 'sprintf-js';
import {AuthenticationService, GlobalVariableService} from '@app/_services';
import {first} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {MDBModalService} from 'ng-uikit-pro-standard';
import {DropzoneComponent} from 'ngx-dropzone-wrapper';
import {environment} from '@environments/environment';
import {apis} from '@core/apis';
import consts from '@core/consts';
import ext2mime from '@core/ext2mime.json';
import {BusinessPartnerDataService} from '@app/shared/_services';

@Component({
  selector: 'app-shared-business-partner-data-edit',
  templateUrl: './shared-business-partner-data-edit.component.html',
  styleUrls: ['./shared-business-partner-data-edit.component.scss']
})
export class SharedBusinessPartnerDataEditComponent implements OnInit {
  @Input() category: string;
  routes = routes;
  form: FormGroup;

  public editableRow: object;
  public config;
  mediaSize: number;

  @ViewChild(DropzoneComponent, { static: false }) mediaRef?: DropzoneComponent;

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
              private service: BusinessPartnerDataService,
              private formBuilder: FormBuilder,) {
  }

  ngOnInit() {
    const row = this.service.editableRowValue();
    // this.globalVariableService.setNavbarTitle(`${strings.registerBots} - ${row.id ? strings.edit : strings.add}`);
    this.title.setTitle(this.translate.instant('HOME_FRONT.HUMAN_CAPITAL') + ' - ' + this.translate.instant('SITE_NAME'));
    this.globalVariableService.getLanguage()
      .subscribe(data => {
        this.title.setTitle(this.translate.instant('HOME_FRONT.HUMAN_CAPITAL') + ' - ' + this.translate.instant('SITE_NAME'));
      });

    this.form = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      social1: new FormControl(''),
      social2: new FormControl(''),
      social3: new FormControl(''),
      media: new FormControl('', Validators.required),
      originMedia: new FormControl('', Validators.required),
    });

    this.f['id'].patchValue(row.id);
    this.f['name'].patchValue(row.name);
    this.f['title'].patchValue(row.title);
    this.f['description'].patchValue(row.description);
    this.f['social1'].patchValue(row.social1);
    this.f['social2'].patchValue(row.social2);
    this.f['social3'].patchValue(row.social3);
    this.f['media'].patchValue(row.media);
    this.f['originMedia'].patchValue(row.originMedia);

    this.backUrl = sprintf("/%s/%s", this.category, routes._partials.businessPartner.main);
    this.config = {
      url: `${environment.apiUrl}${apis.common.upload}/business-partner`,
      // url: `${environment.apiUrl}${apis.common.upload}/${this.category}`,
      acceptedFiles: 'image/*',
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
    const name = f.name.value;
    const title = f.title.value;
    const description = f.description.value;
    const social1 = f.social1.value;
    const social2 = f.social2.value;
    const social3 = f.social3.value;
    const media = f.media.value;
    const originMedia = f.originMedia.value;
    const mediaSize = this.mediaSize;

    const data = {
      id, category, name, title, description, social1, social2, social3, media, originMedia, mediaSize
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
      if (!!row.id && row.media.length > 0) {
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
