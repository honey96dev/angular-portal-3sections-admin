import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@app/shared/shared.module';
import {ConferenceLayoutComponent} from '@app/views/layouts/conference-layout/conference-layout.component';
import {ConferenceRoutingModule} from '@app/conference/conference-routing.module';

@NgModule({
  declarations: [
    ConferenceLayoutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ConferenceRoutingModule,
  ],
})
export class ConferenceModule { }
