import {Component, Input, isDevMode, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import routes from '@core/routes';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {sprintf} from 'sprintf-js';
import {AuthenticationService, GlobalVariableService} from '@app/_services';
import {first, map, startWith} from 'rxjs/operators';
import {UserMgmtService} from '@app/shared/_services';
import {TranslateService} from '@ngx-translate/core';
import {IMyOptions, IOption, MdbAutoCompleterDirective, MDBModalService} from 'ng-uikit-pro-standard';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {apis} from '@core/apis';
import consts from '@core/consts';
import ext2mime from '@core/ext2mime.json';
import {getCodeList} from 'country-list';
import {Country} from '@app/_models';

@Component({
  selector: 'app-shared-user-mgmt-edit',
  templateUrl: './shared-user-mgmt-edit.component.html',
  styleUrls: ['./shared-user-mgmt-edit.component.scss']
})
export class SharedUserMgmtEditComponent implements OnInit {
  @Input() category: string;
  routes = routes;
  form: FormGroup;

  public editableRow: object;
  mediaSize: number;

  @ViewChild(MdbAutoCompleterDirective, { static: true }) mdbAutoCompleter: MdbAutoCompleterDirective;

  backUrl: string = '';

  lang: string;
  loading = false;
  alert = {
    show: false,
    type: '',
    message: '',
  };

  genders: Array<IOption> = [];
  countryCodes: Array<IOption> = [];
  public datePickerOptions: IMyOptions = {
    minYear: 1900,
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private title: Title,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private authService: AuthenticationService,
              private modalService: MDBModalService,
              private service: UserMgmtService,
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


    this.genders = [
      {value: consts.male, label: this.translate.instant('COMMON.GENDER.MALE'), icon: ''},
      {value: consts.female, label: this.translate.instant('COMMON.GENDER.FEMALE'), icon: ''},
    ];
    this.countryCodes = [
      {
        value: consts.PHONE_PREFIX_BAHRAIN,
        label: consts.PHONE_PREFIX_BAHRAIN + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.BAHRAIN'),
        icon: ''
      },
      {
        value: consts.PHONE_PREFIX_KUWAIT,
        label: consts.PHONE_PREFIX_KUWAIT + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.KUWAIT'),
        icon: ''
      },
      {
        value: consts.PHONE_PREFIX_OMAN,
        label: consts.PHONE_PREFIX_OMAN + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.OMAN'),
        icon: ''
      },
      {
        value: consts.PHONE_PREFIX_QATAR,
        label: consts.PHONE_PREFIX_QATAR + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.QATAR'),
        icon: ''
      },
      {
        value: consts.PHONE_PREFIX_SAUDI_ARABIA,
        label: consts.PHONE_PREFIX_SAUDI_ARABIA + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.SAUDI_ARABIA'),
        icon: ''
      },
      {
        value: consts.PHONE_PREFIX_UAE,
        label: consts.PHONE_PREFIX_UAE + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.UAE'),
        icon: ''
      },
    ];

    this.title.setTitle(title);
    this.globalVariableService.getLanguage()
      .subscribe(data => {
        this.title.setTitle(title);
        this.lang = data;

        this.genders = [
          {value: consts.male, label: this.translate.instant('COMMON.GENDER.MALE'), icon: ''},
          {value: consts.female, label: this.translate.instant('COMMON.GENDER.FEMALE'), icon: ''},
        ];
        this.countryCodes = [
          {
            value: consts.PHONE_PREFIX_BAHRAIN,
            label: consts.PHONE_PREFIX_BAHRAIN + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.BAHRAIN'),
            icon: ''
          },
          {
            value: consts.PHONE_PREFIX_KUWAIT,
            label: consts.PHONE_PREFIX_KUWAIT + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.KUWAIT'),
            icon: ''
          },
          {
            value: consts.PHONE_PREFIX_OMAN,
            label: consts.PHONE_PREFIX_OMAN + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.OMAN'),
            icon: ''
          },
          {
            value: consts.PHONE_PREFIX_QATAR,
            label: consts.PHONE_PREFIX_QATAR + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.QATAR'),
            icon: ''
          },
          {
            value: consts.PHONE_PREFIX_SAUDI_ARABIA,
            label: consts.PHONE_PREFIX_SAUDI_ARABIA + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.SAUDI_ARABIA'),
            icon: ''
          },
          {
            value: consts.PHONE_PREFIX_UAE,
            label: consts.PHONE_PREFIX_UAE + ' - ' + this.translate.instant('COMMON.GCC_COUNTRIES.UAE'),
            icon: ''
          },
        ];
      });


    this.form = this.formBuilder.group({
      id: [''],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.maxLength(20)]],
      firstName: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      sector: ['', [Validators.required]],
      company: ['', [Validators.required]],
      city: ['', [Validators.required]],
      countryCode: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });

    this.f['id'].patchValue(row.id);
    this.f.email.patchValue(row.email);
    this.f.username.patchValue(row.username);
    this.f.firstName.patchValue(row.firstName);
    this.f.fatherName.patchValue(row.fatherName);
    this.f.lastName.patchValue(row.lastName);
    this.f.gender.patchValue(row.gender);
    this.f.birthday.patchValue(row.birthday2);
    this.f.jobTitle.patchValue(row.jobTitle);
    this.f.sector.patchValue(row.sector);
    this.f.company.patchValue(row.company);
    this.f.city.patchValue(row.city);
    this.f.countryCode.patchValue(row.countryCode);
    this.f.phone.patchValue(row.phone);

    this.backUrl = sprintf("/%s", routes._partials.userMgmt.main);
  }

  get f() {
    return this.form.controls;
  }

  closeAlert() {
    this.alert.show = false;
  }

  onSubmit() {
    const row = this.service.editableRowValue();
    const f = this.f;
    const id = f.id.value;
    const email = this.f.email.value;
    const username = this.f.username.value;
    const firstName = this.f.firstName.value;
    const fatherName = this.f.fatherName.value;
    const lastName = this.f.lastName.value;
    const gender = this.f.gender.value;
    const birthday = this.f.birthday.value || new Date().toISOString().substr(0, 10);
    const jobTitle = this.f.jobTitle.value;
    const sector = this.f.sector.value;
    const company = this.f.company.value;
    const city = this.f.city.value;
    const countryCode = this.f.countryCode.value;
    const phone = this.f.phone.value;

    // const birthdayStr = birthday.toISOString().substr(0, 10);
    const birthdayStr = birthday;

    const data = {
      id,
      email,
      username,
      firstName,
      fatherName,
      lastName,
      gender,
      birthday: birthdayStr,
      jobTitle,
      sector,
      company,
      city,
      countryCode,
      phone,
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

}
