import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import consts from '@core/consts';

@Component({
  selector: 'app-conference-upcoming-events-data',
  templateUrl: './conference-upcoming-events-data.component.html',
  styleUrls: ['./conference-upcoming-events-data.component.scss']
})
export class ConferenceUpcomingEventsDataComponent implements OnInit{
  consts = consts;
  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService) {
  }

  ngOnInit() {
  }
}
