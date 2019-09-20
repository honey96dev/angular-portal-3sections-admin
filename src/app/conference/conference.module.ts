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
import {ConferenceDirectorBoardDataComponent} from '@app/conference/views/director-board/conference-director-board-data.component';
import {ConferenceDirectorBoardDataEditComponent} from '@app/conference/views/director-board/conference-director-board-data-edit.component';

@NgModule({
  declarations: [
    ConferenceLayoutComponent,
    ConferenceMainDataComponent,
    ConferenceMainDataEditComponent,
    ConferencePreviousEventsDataComponent,
    ConferencePreviousEventsDataEditComponent,
    ConferenceUpcomingEventsDataComponent,
    ConferenceUpcomingEventsDataEditComponent,
    ConferenceDirectorBoardDataComponent,
    ConferenceDirectorBoardDataEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ConferenceRoutingModule,
  ],
})
export class ConferenceModule { }
