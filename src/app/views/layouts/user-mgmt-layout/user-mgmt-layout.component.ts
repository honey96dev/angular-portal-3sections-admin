import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService, GlobalVariableService, TranslationService} from '@app/_services';
import {Router} from '@angular/router';
import {MDBModalService} from 'ng-uikit-pro-standard';
import {TranslateService} from '@ngx-translate/core';
import routes from '@core/routes';

// let authLayout;

@Component({
  selector: 'app-user-mgmt-layout',
  templateUrl: './user-mgmt-layout.component.html',
  styleUrls: ['./user-mgmt-layout.component.scss']
})
export class UserMgmtLayoutComponent implements OnInit {
  language: string;
  routes = routes;

  @ViewChild('sidenav', {static: true}) public sidenav: any;

  constructor(private globalVariableService: GlobalVariableService,
              private router: Router,
              private translationService: TranslationService,
              private translate: TranslateService,
              private authService: AuthenticationService) {
    // authLayout = this;
  }

  ngOnInit() {

  }

  onLanguageButtonClicked(lang) {
    this.language = lang;
    this.translationService.setLanguage(lang);
    this.globalVariableService.setLanguage(lang);
  }

  clearSection() {
    this.globalVariableService.setSection('');
  }

  onActivate(event) {
    window.scroll(0,0);
    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)
  }

  signOut() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }
}
