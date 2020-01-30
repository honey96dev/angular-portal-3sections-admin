import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@app/shared/shared.module';
import {BusinessLayoutComponent} from '@app/views/layouts/business-layout/business-layout.component';
import {BusinessRoutingModule} from '@app/business/business-routing.module';
import {BusinessMainDataComponent} from '@app/business/views/main/business-main-data.component';
import {BusinessMainDataEditComponent} from '@app/business/views/main/business-main-data-edit.component';
import {BusinessAnnualDataComponent} from '@app/business/views/annual/business-annual-data.component';
import {BusinessUpcomingDataComponent} from '@app/business/views/upcoming/business-upcoming-data.component';
import {BusinessUpcomingDataEditComponent} from '@app/business/views/upcoming/business-upcoming-data-edit.component';
import {BusinessPreviousDataComponent} from '@app/business/views/previous/business-previous-data.component';
import {BusinessPreviousDataEditComponent} from '@app/business/views/previous/business-previous-data-edit.component';
import {BusinessPrevClientsDataComponent} from '@app/business/views/prev-clients/business-prev-clients-data.component';
import {BusinessPrevClientsDataEditComponent} from '@app/business/views/prev-clients/business-prev-clients-data-edit.component';
import {BusinessInstructorsDataComponent} from '@app/business/views/instructors/business-instructors-data.component';
import {BusinessInstructorsDataEditComponent} from '@app/business/views/instructors/business-instructors-data-edit.component';
import {BusinessContactUsDataComponent} from '@app/business/views/contact-us/business-contact-us-data.component';
import {BusinessContactUsDataEditComponent} from '@app/business/views/contact-us/business-contact-us-data-edit.component';
import {BusinessDirectorBoardDataComponent} from '@app/business/views/director-board/business-director-board-data.component';
import {BusinessDirectorBoardDataEditComponent} from '@app/business/views/director-board/business-director-board-data-edit.component';
import {BusinessCourseJoinDataComponent} from '@app/business/views/course-join/business-course-join-data.component';
import {BusinessQrScannerComponent} from '@app/business/views/qr-scanner/business-qr-scanner.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BusinessRoutingModule,
  ],
  declarations: [
    BusinessLayoutComponent,
    BusinessMainDataComponent,
    BusinessMainDataEditComponent,
    BusinessAnnualDataComponent,
    BusinessUpcomingDataComponent,
    BusinessUpcomingDataEditComponent,
    BusinessPreviousDataComponent,
    BusinessPreviousDataEditComponent,
    BusinessPrevClientsDataComponent,
    BusinessPrevClientsDataEditComponent,
    BusinessInstructorsDataComponent,
    BusinessInstructorsDataEditComponent,
    BusinessContactUsDataComponent,
    BusinessContactUsDataEditComponent,
    BusinessDirectorBoardDataComponent,
    BusinessDirectorBoardDataEditComponent,
    BusinessCourseJoinDataComponent,
    BusinessQrScannerComponent,
  ],
})
export class BusinessModule { }
