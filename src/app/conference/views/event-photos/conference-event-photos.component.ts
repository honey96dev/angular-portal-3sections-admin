import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import consts from '@core/consts';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-conference-event-photos',
  templateUrl: './conference-event-photos.component.html',
  styleUrls: ['./conference-event-photos.component.scss']
})
export class ConferenceEventPhotosComponent implements OnInit{
  @Input() category: string;
  @Input() scope: string;

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
