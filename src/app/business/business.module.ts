import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@app/shared/shared.module';
import {BusinessLayoutComponent} from '@app/views/layouts/business-layout/business-layout.component';
import {BusinessRoutingModule} from '@app/business/business-routing.module';

@NgModule({
  declarations: [
    BusinessLayoutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BusinessRoutingModule,
  ],
})
export class BusinessModule { }
