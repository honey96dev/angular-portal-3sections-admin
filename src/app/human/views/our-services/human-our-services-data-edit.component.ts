import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';

@Component({
  selector: 'app-human-our-services-data-edit',
  templateUrl: './human-our-services-data-edit.component.html',
  styleUrls: ['./human-our-services-data-edit.component.scss']
})
export class HumanOurServicesDataEditComponent implements OnInit{

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService) {
  }

  ngOnInit() {
  }
}
