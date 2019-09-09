import {Component, OnInit} from '@angular/core';
import {GlobalVariableService, TranslationService} from '@app/_services';
import {locale as enLang} from '@core/i18n/en';
import {locale as arLang} from '@core/i18n/ar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  // direction: string;
  constructor(private globalVariableService: GlobalVariableService,
              private translationService: TranslationService) {
  }

  ngOnInit() {
    this.translationService.loadTranslations(enLang, arLang);
    this.translationService.setLanguage(this.translationService.getSelectedLanguage());
    // this.globalVariableService.getLanguage()
    //   .subscribe(data => {
    //     this.direction = directions['data'];
    //   });
  }
}
