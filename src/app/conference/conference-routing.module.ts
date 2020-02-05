import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConferenceLayoutComponent} from '@app/views/layouts/conference-layout/conference-layout.component';
import {ConferenceMainDataComponent} from '@app/conference/views/main/conference-main-data.component';
import {ConferenceMainDataEditComponent} from '@app/conference/views/main/conference-main-data-edit.component';
import {ConferencePreviousEventsDataComponent} from '@app/conference/views/previous-events/conference-previous-events-data.component';
import {ConferencePreviousEventsDataEditComponent} from '@app/conference/views/previous-events/conference-previous-events-data-edit.component';
import {ConferenceUpcomingEventsDataComponent} from '@app/conference/views/upcoming-events/conference-upcoming-events-data.component';
import {ConferenceUpcomingEventsDataEditComponent} from '@app/conference/views/upcoming-events/conference-upcoming-events-data-edit.component';
import {ConferenceEventPhotosComponent} from '@app/conference/views/event-photos/conference-event-photos.component';
import {ConferenceEventPhotosEditComponent} from '@app/conference/views/event-photos/conference-event-photos-edit.component';
import {ConferencePrevSponsorsDataComponent} from '@app/conference/views/prev-sponsors/conference-prev-sponsors-data.component';
import {ConferencePrevSponsorsDataEditComponent} from '@app/conference/views/prev-sponsors/conference-prev-sponsors-data-edit.component';
import {ConferenceDirectorBoardDataComponent} from '@app/conference/views/director-board/conference-director-board-data.component';
import {ConferenceDirectorBoardDataEditComponent} from '@app/conference/views/director-board/conference-director-board-data-edit.component';
import {ConferenceEventJoinDataComponent} from '@app/conference/views/event-join/conference-event-join-data.component';
import {ConferenceQrScannerComponent} from '@app/conference/views/qr-scanner/conference-qr-scanner.component';
import {ConferenceAboutUsDataComponent} from '@app/conference/views/about-us/conference-about-us-data.component';

const routes: Routes = [
  {
    path: '',
    component: ConferenceLayoutComponent,
    children: [
      {path: '', component: ConferenceMainDataComponent},
      {path: 'media-slider/edit', component: ConferenceMainDataEditComponent},

      {path: 'previous-events', component: ConferencePreviousEventsDataComponent},
      {path: 'previous-events/edit', component: ConferencePreviousEventsDataEditComponent},

      {path: 'upcoming-events', component: ConferenceUpcomingEventsDataComponent},
      {path: 'upcoming-events/edit', component: ConferenceUpcomingEventsDataEditComponent},

      {path: 'event-photos/edit/:target', component: ConferenceEventPhotosEditComponent},
      {path: 'event-photos/edit/:target/:id', component: ConferenceEventPhotosEditComponent},
      {path: 'event-photos/:target', component: ConferenceEventPhotosComponent},
      {path: 'event-photos/:target/:page', component: ConferenceEventPhotosComponent},

      {path: 'prev-sponsors', component: ConferencePrevSponsorsDataComponent},
      {path: 'prev-sponsors/edit', component: ConferencePrevSponsorsDataEditComponent},

      {path: 'director-board', component: ConferenceDirectorBoardDataComponent},
      {path: 'director-board/edit', component: ConferenceDirectorBoardDataEditComponent},

      {path: 'event-join/:id', component: ConferenceEventJoinDataComponent},

      {path: 'qr-scanner', component: ConferenceQrScannerComponent},

      {path: 'about-us', component: ConferenceAboutUsDataComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConferenceRoutingModule { }
