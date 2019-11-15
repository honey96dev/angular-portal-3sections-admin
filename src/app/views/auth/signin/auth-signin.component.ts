import {Component, ElementRef, isDevMode, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import {AuthenticationService, GlobalVariableService} from '@app/_services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import consts from '@core/consts';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {
  alert: {
    show: boolean,
    type: string,
    message: string
  } = {show: false, type: 'alert-danger', message: 'error message'};
  loading: boolean = false;

  form: FormGroup;
  returnUrl: string;

  constructor(private router: Router,
              private title: Title,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.title.setTitle(this.translate.instant('SIGNIN.SIGNIN') + ' - ' + this.translate.instant('SITE_NAME'));
    this.globalVariableService.getLanguage()
      .subscribe(data => {
        this.title.setTitle(this.translate.instant('SIGNIN.SIGNIN') + ' - ' + this.translate.instant('SITE_NAME'));
      });

    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    isDevMode() && this.f.username.patchValue('honey96dev');
    isDevMode() && this.f.password.patchValue('123456');

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.form.controls;
  }

  closeAlert() {
    this.alert.show = false;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const username = this.f.username.value;
    const password = this.f.password.value;

    this.authService.signIn({
      username,
      password
    })
      .pipe(first())
      .subscribe(res => {
        this.loading = false;
        const {result, message, params} = res;
        if (result === consts.success) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.alert = {
            show: true,
            type: 'alert-danger',
            message: message,
          };
        }
      }
      , error => {
        this.loading = false;
        this.alert = {
          show: true,
          type: 'alert-danger',
          message: this.translate.instant('COMMON.UNKNOWN_SERVER_ERROR'),
        };
      }
      );
  }
}
