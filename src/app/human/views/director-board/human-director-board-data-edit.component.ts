import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';

@Component({
  selector: 'app-human-director-board-data-edit',
  templateUrl: './human-director-board-data-edit.component.html',
  styleUrls: ['./human-director-board-data-edit.component.scss']
})
export class HumanDirectorBoardDataEditComponent implements OnInit{

  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService) {
  }

  ngOnInit() {
  }
}
