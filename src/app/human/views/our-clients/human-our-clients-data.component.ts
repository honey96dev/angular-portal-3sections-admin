import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';

@Component({
  selector: 'app-human-our-clients-data',
  templateUrl: './human-our-clients-data.component.html',
  styleUrls: ['./human-our-clients-data.component.scss']
})
export class HumanOurClientsDataComponent implements OnInit{

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService) {
  }

  ngOnInit() {
  }
}
