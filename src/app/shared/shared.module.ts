import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MDBBootstrapModulesPro} from 'ng-uikit-pro-standard';
import {TranslateModule} from '@ngx-translate/core';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from '@core/reducers';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DROPZONE_CONFIG, DropzoneModule, DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {environment} from '@environments/environment';
import {apis} from '@core/apis';
import {AlertModalComponent} from '@app/shared/views/_partials/common-dialogs/alert/alert-modal.component';
import {QuestionModalComponent} from '@app/shared/views/_partials/common-dialogs/question/question-modal.component';
import {LayoutFooterComponent} from '@app/views/layouts/_partials/footer/layout-footer.component';
import {SharedMediaSliderDataComponent} from '@app/shared/views/_partials/media-slider-data/shared-media-slider-data.component';
import {SharedMediaSliderDataEditComponent} from '@app/shared/views/_partials/media-slider-data/shared-media-slider-data-edit.component';
import {SharedOurServicesDataComponent} from '@app/shared/views/_partials/our-services-data/shared-our-services-data.component';
import {SharedOurServicesDataEditComponent} from '@app/shared/views/_partials/our-services-data/shared-our-services-data-edit.component';
import {SharedContactUsDataComponent} from '@app/shared/views/_partials/contact-us-data/shared-contact-us-data.component';
import {SharedContactUsDataEditComponent} from '@app/shared/views/_partials/contact-us-data/shared-contact-us-data-edit.component';
import {SharedBusinessPartnerDataComponent} from '@app/shared/views/_partials/business-partner-data/shared-business-partner-data.component';
import {SharedBusinessPartnerDataEditComponent} from '@app/shared/views/_partials/business-partner-data/shared-business-partner-data-edit.component';
import {SharedOurClientsDataComponent} from '@app/shared/views/_partials/our-clients-data/shared-our-clients-data.component';
import {SharedOurClientsDataEditComponent} from '@app/shared/views/_partials/our-clients-data/shared-our-clients-data-edit.component';
import {SharedDirectorBoardDataComponent} from '@app/shared/views/_partials/director-board-data/shared-director-board-data.component';
import {SharedDirectorBoardDataEditComponent} from '@app/shared/views/_partials/director-board-data/shared-director-board-data-edit.component';
import {RatingModule} from 'ng-starrating';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: `${environment.apiUrl}${apis.common.upload}`,
  maxFilesize: 50,
  acceptedFiles: 'image/*',
  createImageThumbnails: true,
};

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    StoreModule.forRoot(reducers, {metaReducers}),
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DropzoneModule,
    RatingModule,
  ],
  declarations: [
    AlertModalComponent,
    QuestionModalComponent,

    LayoutFooterComponent,

    SharedMediaSliderDataComponent,
    SharedMediaSliderDataEditComponent,
    SharedOurServicesDataComponent,
    SharedOurServicesDataEditComponent,
    SharedContactUsDataComponent,
    SharedContactUsDataEditComponent,
    SharedBusinessPartnerDataComponent,
    SharedBusinessPartnerDataEditComponent,
    SharedOurClientsDataComponent,
    SharedOurClientsDataEditComponent,
    SharedDirectorBoardDataComponent,
    SharedDirectorBoardDataEditComponent,
  ],
  exports: [
    MDBBootstrapModulesPro,
    StoreModule,
    TranslateModule,
    FormsModule,

    AlertModalComponent,
    QuestionModalComponent,

    LayoutFooterComponent,

    SharedMediaSliderDataComponent,
    SharedMediaSliderDataEditComponent,
    SharedOurServicesDataComponent,
    SharedOurServicesDataEditComponent,
    SharedBusinessPartnerDataComponent,
    SharedBusinessPartnerDataEditComponent,
    SharedContactUsDataComponent,
    SharedContactUsDataEditComponent,
    SharedOurClientsDataComponent,
    SharedOurClientsDataEditComponent,
    SharedDirectorBoardDataComponent,
    SharedDirectorBoardDataEditComponent,
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  entryComponents: [
    AlertModalComponent,
    QuestionModalComponent,
  ]
})
export class SharedModule { }
