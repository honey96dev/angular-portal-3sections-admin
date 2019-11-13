import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MDBModalService} from 'ng-uikit-pro-standard';
import {TranslateService} from '@ngx-translate/core';
import routes from '@core/routes';
import {AuthenticationService, GlobalVariableService} from '@app/_services';
import {QrScannerDataService} from '@app/shared/_services';
import {DeviceDetectorService} from 'ngx-device-detector';
import {BarcodeFormat} from '@zxing/library';
import {BehaviorSubject} from 'rxjs';
import {first} from 'rxjs/operators';
import consts from '@core/consts';

@Component({
  selector: 'app-shared-qr-scanner',
  templateUrl: './shared-qr-scanner.component.html',
  styleUrls: ['./shared-qr-scanner.component.scss']
})
export class SharedQrScannerComponent implements OnInit {
  @Input() category: string;
  routes = routes;
  form: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  alert = {
    show: false,
    type: '',
    message: '',
  };

  scannerEnabled: boolean = true;

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  deviceSelect: any[] = [];
  currentDeviceId: string = '';

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  submittable: boolean = false;

  isDesktop: boolean;
  isMobile: boolean;
  isTablet: boolean;

  public constructor(private router: Router,
                     private route: ActivatedRoute,
                     private title: Title,
                     private globalVariableService: GlobalVariableService,
                     private translate: TranslateService,
                     private authService: AuthenticationService,
                     private modalService: MDBModalService,
                     private service: QrScannerDataService,
                     private deviceService: DeviceDetectorService,
                     private formBuilder: FormBuilder,
                     private cdRef: ChangeDetectorRef
  ) {

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
      category: ['', Validators.required],
      id: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      email: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      company: ['', [Validators.required]],
      position: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      hash: ['', [Validators.required]],
    });

    this.scannerEnabled = true;
    this.isDesktop = this.deviceService.isDesktop();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  get f() {
    return this.form.controls;
  }

  closeAlert() {
    this.alert.show = false;
  }

  clearResult(): void {
    this.qrResultString = null;
    this.f.category.reset('');
    this.f.id.reset('');
    this.f.userId.reset('');
    this.f.email.reset('');
    this.f.firstName.reset('');
    this.f.lastName.reset('');
    this.f.company.reset('');
    this.f.position.reset('');
    this.f.country.reset('');
    this.f.city.reset('');
    this.f.phone.reset('');
    this.f.hash.reset('');

    this.scannerEnabled = true;
    this.alert.show = false;
    this.submittable = false;
  }

  submit() {
    const id = this.f.id.value;
    const userId = this.f.userId.value;
    const email = this.f.email.value;
    const hash = this.f.hash.value;

    const params = {category: this.category, id, userId, email, hash};
    this.loading = true;
    this.service.post(params).pipe(first())
      .subscribe(res => {
        this.loading = false;
        // this.clearResult();
        this.alert = {
          show: true,
          type: res.result === consts.success ? 'alert-success' : 'alert-danger',
          message: res.message,
        };
      }, err => {
        this.loading = false;
        this.submittable = false;
        this.alert = {
          show: true,
          type: 'alert-danger',
          message: this.translate.instant('COMMON.UNKNOWN_SERVER_ERROR'),
        };
      });
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
    this.deviceSelect = [{value: '', label: ''}];
    for (let device of devices) {
      // this.deviceSelect.push({value: device, label: device.label})
      this.deviceSelect.push({value: device.deviceId, label: device.label})
    }
  }

  onCodeResult(resultString: string) {
    if (!this.submittable) {
      this.qrResultString = resultString;
      const result = resultString.split('@@');
      if (result.length !== 5) {
        return;
      }
      if (result[0] === consts.event || result[0] === consts.course) {
        this.f.category.patchValue(this.translate.instant('SHARED_QR_SCANNER.' + result[0].toUpperCase()));
      } else {
        this.f.category.patchValue(this.translate.instant(result[0]));
      }
      this.f.id.patchValue(result[1]);
      this.f.userId.patchValue(result[2]);
      this.f.email.patchValue(result[3]);
      this.f.hash.patchValue(result[4]);

      console.log('scanned');
      if (result[0] !== this.category) {
        this.submittable = false;
        this.alert = {
          show: true,
          type: 'alert-danger',
          message: this.translate.instant('SHARED_QR_SCANNER.CATEGORY_MISMATCH'),
        };
        return;
      }

      const params = {category: result[0], id: result[1], userId: result[2], email: result[3], hash: result[4]};
      this.loading = true;
      this.service.get(params).pipe(first())
        .subscribe(res => {
          this.loading = false;
          if (res.result === consts.success) {
            this.f.firstName.patchValue(res.data.firstName);
            this.f.lastName.patchValue(res.data.lastName);
            this.f.company.patchValue(res.data.company);
            this.f.position.patchValue(res.data.position);
            this.f.country.patchValue(res.data.country);
            this.f.city.patchValue(res.data.city);
            this.f.phone.patchValue(res.data.phone);
            this.scannerEnabled = false;
            this.submittable = true;
            this.alert.show = false;
          } else {
            this.f.firstName.reset('');
            this.f.lastName.reset('');
            this.f.company.reset('');
            this.f.position.reset('');
            this.f.country.reset('');
            this.f.city.reset('');
            this.f.phone.reset('');
            this.submittable = false;
            this.alert = {
              show: true,
              type: 'alert-danger',
              message: res.message,
            };
          }
        }, err => {
          this.loading = false;
          this.submittable = false;
          this.alert = {
            show: true,
            type: 'alert-danger',
            message: this.translate.instant('COMMON.UNKNOWN_SERVER_ERROR'),
          };
        });
    }
  }

  onDeviceSelectChange(selected: any) {
    // console.log('PREVIOUS', this.currentDevice);
    if (this.availableDevices) {
      const device = this.availableDevices.find(x => x.deviceId === selected);
      this.currentDevice = device || null;
      console.log('currentDevice', this.currentDevice);
      // setTimeout(() => {
      //
      // }, 500);
    }
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }
}
