import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@app/shared/shared.module';
import {HumanLayoutComponent} from '@app/views/layouts/human-layout/human-layout.component';
import {HumanRoutingModule} from '@app/human/human-routing.module';
import {HumanMainDataComponent} from '@app/human/views/main/human-main-data.component';
import {HumanMainDataEditComponent} from '@app/human/views/main/human-main-data-edit.component';

@NgModule({
  declarations: [
    HumanLayoutComponent,
    HumanMainDataComponent,
    HumanMainDataEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HumanRoutingModule,
  ],
})
export class HumanModule { }
