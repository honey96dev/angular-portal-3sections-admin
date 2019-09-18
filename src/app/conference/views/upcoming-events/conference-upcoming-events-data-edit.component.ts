import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import consts from '@core/consts';

@Component({
  selector: 'app-conference-upcoming-events-data-edit',
  templateUrl: './conference-upcoming-events-data-edit.component.html',
  styleUrls: ['./conference-upcoming-events-data-edit.component.scss']
})
export class ConferenceUpcomingEventsDataEditComponent implements OnInit{
  consts = consts;
  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService) {
  }

  ngOnInit() {
  }
}
