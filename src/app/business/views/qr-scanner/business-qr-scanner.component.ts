import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import consts from '@core/consts';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-business-qr-scanner',
  templateUrl: './business-qr-scanner.component.html',
  styleUrls: ['./business-qr-scanner.component.scss']
})
export class BusinessQrScannerComponent implements OnInit{
  consts = consts;

  constructor(private router: Router,
              private title: Title,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.title.setTitle(this.translate.instant('HOME_FRONT.CONFERENCE') + ' - ' + this.translate.instant('SITE_NAME'));
    this.globalVariableService.getLanguage()
      .subscribe(data => {
        this.title.setTitle(this.translate.instant('HOME_FRONT.CONFERENCE') + ' - ' + this.translate.instant('SITE_NAME'));
      });
  }
}
