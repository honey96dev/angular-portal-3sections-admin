import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BusinessLayoutComponent} from '@app/views/layouts/business-layout/business-layout.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessLayoutComponent,
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
export class BusinessRoutingModule { }
