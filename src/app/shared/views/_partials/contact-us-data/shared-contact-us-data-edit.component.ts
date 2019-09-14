import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import routes from '@core/routes';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {sprintf} from 'sprintf-js';
import {AuthenticationService, GlobalVariableService} from '@app/_services';
import {first} from 'rxjs/operators';
import {ContactUsDataService} from '@app/shared/_services';
import {TranslateService} from '@ngx-translate/core';
import {MDBModalService} from 'ng-uikit-pro-standard';
import {DropzoneComponent, DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {environment} from '@environments/environment';
import {apis} from '@core/apis';
import consts from '@core/consts';
import ext2mime from '@core/ext2mime.json';

@Component({
  selector: 'app-shared-contact-us-data-edit',
  templateUrl: './shared-contact-us-data-edit.component.html',
  styleUrls: ['./shared-contact-us-data-edit.component.scss']
})
export class SharedContactUsDataEditComponent implements OnInit {
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
              private service: ContactUsDataService,
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
      name: new FormControl(''),
      email: new FormControl(''),
      subject: new FormControl('', ),
      message: new FormControl('', ),
    });

    this.f['id'].patchValue(row.id);
    this.f['name'].patchValue(row.name);
    this.f['email'].patchValue(row.email);
    this.f['subject'].patchValue(row.subject);
    this.f['message'].patchValue(row.message);

    this.backUrl = sprintf("/%s/%s", this.category, routes._partials.contactUs.main);
  }

  get f() {
    return this.form.controls;
  }

  closeAlert() {
    this.alert.show = false;
  }
}
