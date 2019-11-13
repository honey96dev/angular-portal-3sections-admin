import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService, MassEmailService} from '@app/_services';
import consts from '@core/consts';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MDBModalRef, MDBModalService} from 'ng-uikit-pro-standard';
import {first} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home-mass-email',
  templateUrl: './home-mass-email.component.html',
  styleUrls: ['./home-mass-email.component.scss']
})
export class HomeMassEmailComponent implements OnInit{
  @Input() category: string;
  consts = consts;
  modalRef: MDBModalRef;

  form: FormGroup;
  loading = false;
  alert = {
    show: false,
    type: '',
    message: '',
  };

  constructor(private router: Router,
              private title: Title,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService,
              private service: MassEmailService,
              private modalService: MDBModalService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.title.setTitle(this.translate.instant('HOME_FRONT.MASS_EMAIL') + ' - ' + this.translate.instant('SITE_NAME'));
    this.globalVariableService.getLanguage()
      .subscribe(data => {
        this.title.setTitle(this.translate.instant('HOME_FRONT.MASS_EMAIL') + ' - ' + this.translate.instant('SITE_NAME'));
      });

    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

  closeAlert() {
    this.alert.show = false;
  }

  submit() {
    const f = this.f;
    const name = f.name.value;
    const subject = f.subject.value;
    const message = f.message.value;

    const params = {name, subject, message};

    this.service.sendEmail(params).pipe(first())
      .subscribe(res => {
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
