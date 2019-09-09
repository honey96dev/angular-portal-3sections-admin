import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HumanLayoutComponent} from '@app/views/layouts/human-layout/human-layout.component';
import {HumanMainDataComponent} from '@app/human/views/main/human-main-data.component';
import {HumanMainDataEditComponent} from '@app/human/views/main/human-main-data-edit.component';

const routes: Routes = [
  {
    path: '',
    component: HumanLayoutComponent,
    children: [
      {path: '', component: HumanMainDataComponent},
      {path: 'media-slider/edit', component: HumanMainDataEditComponent},
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
export class HumanRoutingModule { }
