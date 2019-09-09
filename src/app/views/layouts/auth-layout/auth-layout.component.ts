import { Component, OnInit } from '@angular/core';
import {GlobalVariableService, TranslationService} from '@app/_services';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
// import {environment} from "@environments/environment";
// import SocketIOClient from 'socket.io-client';

// let authLayout;

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  constructor(private globalVariableService: GlobalVariableService,
              private router: Router,
              private translationService: TranslationService,
              private translate: TranslateService) {
    // authLayout = this;
  }

  ngOnInit() {
  }

  // sendSignoutSignal() {
  //   if (authLayout.pingTimoutId) {
  //     clearTimeout(authLayout.pingTimoutId);
  //   }
  //   authLayout.pingTimoutId = setTimeout(authLayout.sendSignoutSignal, environment.pingTimeoutDelay);
  //   authLayout.ioClient.emit('user-signout');
  // }


  onLanguageButtonClicked() {
    let lang = this.translationService.getSelectedLanguage();
    lang = lang === 'en' ? 'ar' : 'en';
    this.translationService.setLanguage(lang);
    this.globalVariableService.setLanguage(lang);
  }
}
