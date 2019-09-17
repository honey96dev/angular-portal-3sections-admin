import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HumanLayoutComponent} from '@app/views/layouts/human-layout/human-layout.component';
import {HumanMainDataComponent} from '@app/human/views/main/human-main-data.component';
import {HumanMainDataEditComponent} from '@app/human/views/main/human-main-data-edit.component';
import {HumanOurServicesDataComponent} from '@app/human/views/our-services/human-our-services-data.component';
import {HumanOurServicesDataEditComponent} from '@app/human/views/our-services/human-our-services-data-edit.component';
import {HumanContactUsDataComponent} from '@app/human/views/contact-us/human-contact-us-data.component';
import {HumanContactUsDataEditComponent} from '@app/human/views/contact-us/human-contact-us-data-edit.component';
import {HumanBusinessPartnerDataComponent} from '@app/human/views/business-partner/human-business-partner-data.component';
import {HumanBusinessPartnerDataEditComponent} from '@app/human/views/business-partner/human-business-partner-data-edit.component';
import {HumanOurClientsDataComponent} from '@app/human/views/our-clients/human-our-clients-data.component';
import {HumanOurClientsDataEditComponent} from '@app/human/views/our-clients/human-our-clients-data-edit.component';
import {HumanDirectorBoardDataComponent} from '@app/human/views/director-board/human-director-board-data.component';
import {HumanDirectorBoardDataEditComponent} from '@app/human/views/director-board/human-director-board-data-edit.component';

const routes: Routes = [
  {
    path: '',
    component: HumanLayoutComponent,
    children: [
      {path: '', component: HumanMainDataComponent},
      {path: 'media-slider/edit', component: HumanMainDataEditComponent},
      {path: 'our-services', component: HumanOurServicesDataComponent},
      {path: 'our-services/edit', component: HumanOurServicesDataEditComponent},
      {path: 'contact-us', component: HumanContactUsDataComponent},
      {path: 'contact-us/edit', component: HumanContactUsDataEditComponent},
      {path: 'business-partner', component: HumanBusinessPartnerDataComponent},
      {path: 'business-partner/edit', component: HumanBusinessPartnerDataEditComponent},
      {path: 'our-clients', component: HumanOurClientsDataComponent},
      {path: 'our-clients/edit', component: HumanOurClientsDataEditComponent},
      {path: 'director-board', component: HumanDirectorBoardDataComponent},
      {path: 'director-board/edit', component: HumanDirectorBoardDataEditComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanRoutingModule { }
