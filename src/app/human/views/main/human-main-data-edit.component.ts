import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';

@Component({
  selector: 'app-human-main-data-edit',
  templateUrl: './human-main-data-edit.component.html',
  styleUrls: ['./human-main-data-edit.component.scss']
})
export class HumanMainDataEditComponent implements OnInit{

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService) {
  }

  ngOnInit() {
  }
}
