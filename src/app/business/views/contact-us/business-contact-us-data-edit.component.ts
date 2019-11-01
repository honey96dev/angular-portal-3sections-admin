import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import consts from '@core/consts';

@Component({
  selector: 'app-business-contact-us-data-edit',
  templateUrl: './business-contact-us-data-edit.component.html',
  styleUrls: ['./business-contact-us-data-edit.component.scss']
})
export class BusinessContactUsDataEditComponent implements OnInit{
  consts = consts;
  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService) {
  }

  ngOnInit() {
  }
}
