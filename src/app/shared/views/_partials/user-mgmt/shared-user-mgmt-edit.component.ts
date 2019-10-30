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
import {MdbAutoCompleterDirective, MDBModalService} from 'ng-uikit-pro-standard';
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
  countries: Country[] = [];
  countriesData: Observable<Country[]>;

  @ViewChild(MdbAutoCompleterDirective, { static: true }) mdbAutoCompleter: MdbAutoCompleterDirective;

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
    this.title.setTitle(title);
    this.globalVariableService.getLanguage()
      .subscribe(data => {
        this.title.setTitle(title);
      });


    this.form = this.formBuilder.group({
      id: [''],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      company: ['', [Validators.required]],
      position: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });

    this.f['id'].patchValue(row.id);
    this.f['email'].patchValue(row.email);
    this.f['firstName'].patchValue(row.firstName);
    this.f['lastName'].patchValue(row.lastName);
    this.f['company'].patchValue(row.company);
    this.f['position'].patchValue(row.position);
    this.f['country'].patchValue(row.country);
    // this.f['country'].patchValue(row.country ? row.country['name'] : '');
    this.f['city'].patchValue(row.city);
    this.f['phone'].patchValue(row.phone);

    this.countriesData = this.f.country.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filter(name) : this.countries.slice())
      );

    const countries = getCodeList();
    let temp = [];
    Object.entries(countries).forEach(value => {
      temp.push({
        code: value[0],
        name: value[1],
      });
    });
    this.countries = temp;

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
    const firstName = this.f.firstName.value;
    const lastName = this.f.lastName.value;
    const company = this.f.company.value;
    const position = this.f.position.value;
    const country = this.f.country.value;
    const city = this.f.city.value;
    const phone = this.f.phone.value;

    const data = {
      id,
      email,
      firstName,
      lastName,
      company,
      position,
      country,
      city,
      phone,
      allow: row.allow,
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


  onDisplayValue(country?: Country): string | undefined {
    return country ? country.name : '';
  }

  filter(name: string): Country[] {
    const filterValue = name.toLowerCase();

    return this.countries.filter(option => option.name.toLowerCase().indexOf(filterValue) >= 0);
  }
}
