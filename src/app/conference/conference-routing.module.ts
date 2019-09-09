import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConferenceLayoutComponent} from '@app/views/layouts/conference-layout/conference-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ConferenceLayoutComponent,
    children: [
      // {path: '', component: BusinessFrontComponent},
      // {path: 'business-partner', component: BusinessBusinessPartnerComponent},
      // {path: 'our-clients', component: BusinessOurClientsComponent},
      // {path: 'contact-us', component: BusinessContactUsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConferenceRoutingModule { }
