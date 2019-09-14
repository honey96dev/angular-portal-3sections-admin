import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';

@Component({
  selector: 'app-human-business-partner-data',
  templateUrl: './human-business-partner-data.component.html',
  styleUrls: ['./human-business-partner-data.component.scss']
})
export class HumanBusinessPartnerDataComponent implements OnInit{

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService) {
  }

  ngOnInit() {
  }
}
