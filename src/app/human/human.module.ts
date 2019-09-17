import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@app/shared/shared.module';
import {HumanLayoutComponent} from '@app/views/layouts/human-layout/human-layout.component';
import {HumanRoutingModule} from '@app/human/human-routing.module';
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

@NgModule({
  declarations: [
    HumanLayoutComponent,
    HumanMainDataComponent,
    HumanMainDataEditComponent,
    HumanOurServicesDataComponent,
    HumanOurServicesDataEditComponent,
    HumanContactUsDataComponent,
    HumanContactUsDataEditComponent,
    HumanBusinessPartnerDataComponent,
    HumanBusinessPartnerDataEditComponent,
    HumanOurClientsDataComponent,
    HumanOurClientsDataEditComponent,
    HumanDirectorBoardDataComponent,
    HumanDirectorBoardDataEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HumanRoutingModule,
  ],
})
export class HumanModule { }
