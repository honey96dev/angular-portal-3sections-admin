import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GlobalVariableService} from '@app/_services';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './layout-footer.component.html',
  styleUrls: ['./layout-footer.component.scss']
})
export class LayoutFooterComponent implements OnInit{
  year: number;
  company: string;
  constructor(private router: Router,
              private globalVariableService: GlobalVariableService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    const today = new Date();
    this.year = today.getFullYear();
    this.company = this.translate.instant('COMPANY');
  }
}
