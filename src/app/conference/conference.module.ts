import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@app/shared/shared.module';
import {ConferenceLayoutComponent} from '@app/views/layouts/conference-layout/conference-layout.component';
import {ConferenceRoutingModule} from '@app/conference/conference-routing.module';
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

@NgModule({
  declarations: [
    ConferenceLayoutComponent,
    ConferenceMainDataComponent,
    ConferenceMainDataEditComponent,
    ConferencePreviousEventsDataComponent,
    ConferencePreviousEventsDataEditComponent,
    ConferenceUpcomingEventsDataComponent,
    ConferenceUpcomingEventsDataEditComponent,
    ConferenceEventPhotosComponent,
    ConferenceEventPhotosEditComponent,
    ConferencePrevSponsorsDataComponent,
    ConferencePrevSponsorsDataEditComponent,
    ConferenceDirectorBoardDataComponent,
    ConferenceDirectorBoardDataEditComponent,
    ConferenceEventJoinDataComponent,
    ConferenceQrScannerComponent,
    ConferenceAboutUsDataComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ConferenceRoutingModule,
  ],
})
export class ConferenceModule { }
