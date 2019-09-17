import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';

@Component({
  selector: 'app-human-our-clients-data-edit',
  templateUrl: './human-our-clients-data-edit.component.html',
  styleUrls: ['./human-our-clients-data-edit.component.scss']
})
export class HumanOurClientsDataEditComponent implements OnInit{

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService) {
  }

  ngOnInit() {
  }
}
