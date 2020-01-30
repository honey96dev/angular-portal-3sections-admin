import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService, GlobalVariableService, TranslationService} from '@app/_services';
import {Router} from '@angular/router';
import {MDBModalService} from 'ng-uikit-pro-standard';
import {TranslateService} from '@ngx-translate/core';
import routes from '@core/routes';

// let authLayout;

@Component({
  selector: 'app-business-layout',
  templateUrl: './business-layout.component.html',
  styleUrls: ['./business-layout.component.scss']
})
export class BusinessLayoutComponent implements OnInit {
  routes = routes;
  language: string;
  scrollDuration: number = 650;
  scrollEasing: string = 'easeInQuad';
  scrollOffset: number = -66;

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
