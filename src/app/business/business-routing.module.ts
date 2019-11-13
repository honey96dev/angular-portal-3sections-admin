import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BusinessLayoutComponent} from '@app/views/layouts/business-layout/business-layout.component';
import {BusinessMainDataComponent} from '@app/business/views/main/business-main-data.component';
import {BusinessMainDataEditComponent} from '@app/business/views/main/business-main-data-edit.component';
import {BusinessUpcomingDataComponent} from '@app/business/views/upcoming/business-upcoming-data.component';
import {BusinessUpcomingDataEditComponent} from '@app/business/views/upcoming/business-upcoming-data-edit.component';
import {BusinessPreviousDataComponent} from '@app/business/views/previous/business-previous-data.component';
import {BusinessPreviousDataEditComponent} from '@app/business/views/previous/business-previous-data-edit.component';
import {BusinessInstructorsDataComponent} from '@app/business/views/instructors/business-instructors-data.component';
import {BusinessInstructorsDataEditComponent} from '@app/business/views/instructors/business-instructors-data-edit.component';
import {BusinessContactUsDataComponent} from '@app/business/views/contact-us/business-contact-us-data.component';
import {BusinessContactUsDataEditComponent} from '@app/business/views/contact-us/business-contact-us-data-edit.component';
import {BusinessDirectorBoardDataComponent} from '@app/business/views/director-board/business-director-board-data.component';
import {BusinessDirectorBoardDataEditComponent} from '@app/business/views/director-board/business-director-board-data-edit.component';
import {BusinessAnnualDataComponent} from '@app/business/views/annual/business-annual-data.component';
import {BusinessCourseJoinDataComponent} from '@app/business/views/course-join/business-course-join-data.component';
import {BusinessQrScannerComponent} from '@app/business/views/qr-scanner/business-qr-scanner.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessLayoutComponent,
    children: [
      {path: '', component: BusinessMainDataComponent},
      {path: 'media-slider/edit', component: BusinessMainDataEditComponent},

      {path: 'annual-upcoming', component: BusinessAnnualDataComponent},

      {path: 'upcoming/edit', component: BusinessUpcomingDataEditComponent},
      {path: 'upcoming/edit/:id', component: BusinessUpcomingDataEditComponent},
      {path: 'upcoming', component: BusinessUpcomingDataComponent},
      {path: 'upcoming/:page', component: BusinessUpcomingDataComponent},

      {path: 'previous/edit', component: BusinessPreviousDataEditComponent},
      {path: 'previous/edit/:id', component: BusinessPreviousDataEditComponent},
      {path: 'previous', component: BusinessPreviousDataComponent},
      {path: 'previous/:page', component: BusinessPreviousDataComponent},

      {path: 'instructors/edit/:target', component: BusinessInstructorsDataEditComponent},
      {path: 'instructors/edit/:target/:id', component: BusinessInstructorsDataEditComponent},
      {path: 'instructors/:target', component: BusinessInstructorsDataComponent},
      {path: 'instructors/:target/:page', component: BusinessInstructorsDataComponent},

      {path: 'contact-us', component: BusinessContactUsDataComponent},
      {path: 'contact-us/edit', component: BusinessContactUsDataEditComponent},

      {path: 'director-board', component: BusinessDirectorBoardDataComponent},
      {path: 'director-board/edit', component: BusinessDirectorBoardDataEditComponent},

      {path: 'course-join/:id', component: BusinessCourseJoinDataComponent},

      {path: 'qr-scanner', component: BusinessQrScannerComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
