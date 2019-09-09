import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import {GlobalVariableService} from '@app/_services';

@Component({
  selector: 'app-home-front',
  templateUrl: './home-front.component.html',
  styleUrls: ['./home-front.component.scss']
})
export class HomeFrontComponent implements OnInit{
  rememberChoice: boolean = false;

  constructor(private router: Router,
              private title: Title,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService) {
    const section = this.globalVariableService.sectionValue;
    if (!!section && section.length > 0) {
      this.router.navigate([section]);
    }
  }

  ngOnInit() {
    this.title.setTitle(this.translate.instant('HOME_FRONT.TITLE') + ' - ' + this.translate.instant('SITE_NAME'));
    this.globalVariableService.getLanguage()
      .subscribe(data => {
        this.title.setTitle(this.translate.instant('HOME_FRONT.TITLE') + ' - ' + this.translate.instant('SITE_NAME'));
      });
  }

  setSection(section: string) {
    if (this.rememberChoice) {
      this.globalVariableService.setSection(section);
    }
  }
}
