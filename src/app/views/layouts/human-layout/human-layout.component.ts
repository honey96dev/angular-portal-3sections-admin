import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService, GlobalVariableService, TranslationService} from '@app/_services';
import {Router} from '@angular/router';
import {MDBModalService} from 'ng-uikit-pro-standard';
import {TranslateService} from '@ngx-translate/core';
import routes from '@core/routes';

// let authLayout;

@Component({
  selector: 'app-human-layout',
  templateUrl: './human-layout.component.html',
  styleUrls: ['./human-layout.component.scss']
})
export class HumanLayoutComponent implements OnInit {
  language: string;
  routes = routes;

  @ViewChild('sidenav', {static: true}) public sidenav: any;

  constructor(private globalVariableService: GlobalVariableService,
              private router: Router,
              private translationService: TranslationService,
              private translate: TranslateService) {
    // authLayout = this;
  }

  ngOnInit() {

  }

  onLanguageButtonClicked() {
    let lang = this.translationService.getSelectedLanguage();
    lang = lang === 'en' ? 'ar' : 'en';
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
}
