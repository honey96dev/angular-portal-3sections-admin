import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';
import consts from '@core/consts';

@Component({
  selector: 'app-home-user-mgmt-edit',
  templateUrl: './home-user-mgmt-edit.component.html',
  styleUrls: ['./home-user-mgmt-edit.component.scss']
})
export class HomeUserMgmtEditComponent implements OnInit{
  consts = consts;
  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService) {
  }

  ngOnInit() {
  }
}
