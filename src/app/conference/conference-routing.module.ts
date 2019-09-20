import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConferenceLayoutComponent} from '@app/views/layouts/conference-layout/conference-layout.component';
import {ConferenceMainDataComponent} from '@app/conference/views/main/conference-main-data.component';
import {ConferenceMainDataEditComponent} from '@app/conference/views/main/conference-main-data-edit.component';
import {ConferencePreviousEventsDataComponent} from '@app/conference/views/previous-events/conference-previous-events-data.component';
import {ConferencePreviousEventsDataEditComponent} from '@app/conference/views/previous-events/conference-previous-events-data-edit.component';
import {ConferenceUpcomingEventsDataComponent} from '@app/conference/views/upcoming-events/conference-upcoming-events-data.component';
import {ConferenceUpcomingEventsDataEditComponent} from '@app/conference/views/upcoming-events/conference-upcoming-events-data-edit.component';
import {ConferenceDirectorBoardDataComponent} from '@app/conference/views/director-board/conference-director-board-data.component';
import {ConferenceDirectorBoardDataEditComponent} from '@app/conference/views/director-board/conference-director-board-data-edit.component';

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
      {path: 'director-board', component: ConferenceDirectorBoardDataComponent},
      {path: 'director-board/edit', component: ConferenceDirectorBoardDataEditComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConferenceRoutingModule { }
