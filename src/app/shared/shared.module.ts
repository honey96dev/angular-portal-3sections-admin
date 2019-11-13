import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MDBBootstrapModulesPro} from 'ng-uikit-pro-standard';
import {TranslateModule} from '@ngx-translate/core';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from '@core/reducers';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RatingModule} from 'ng-starrating';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {DROPZONE_CONFIG, DropzoneModule, DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {environment} from '@environments/environment';
import {apis} from '@core/apis';
import {AlertModalComponent} from '@app/shared/views/_partials/common-dialogs/alert/alert-modal.component';
import {QuestionModalComponent} from '@app/shared/views/_partials/common-dialogs/question/question-modal.component';
import {LayoutFooterComponent} from '@app/views/layouts/_partials/footer/layout-footer.component';
import {SharedUserMgmtComponent} from '@app/shared/views/_partials/user-mgmt/shared-user-mgmt.component';
import {SharedUserMgmtEditComponent} from '@app/shared/views/_partials/user-mgmt/shared-user-mgmt-edit.component';
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
import {SharedEventsDataComponent} from '@app/shared/views/_partials/events-data/shared-events-data.component';
import {SharedEventsDataEditComponent} from '@app/shared/views/_partials/events-data/shared-events-data-edit.component';
import {SharedEventJoinDataComponent} from '@app/shared/views/_partials/events-data/shared-event-join-data.component';
import {SharedCourseDataComponent} from '@app/shared/views/_partials/course-data/shared-course-data.component';
import {SharedCourseDataEditComponent} from '@app/shared/views/_partials/course-data/shared-course-data-edit.component';
import {SharedCourseInstructorsComponent} from '@app/shared/views/_partials/course-data/shared-course-instructors.component';
import {SharedCourseInstructorsEditComponent} from '@app/shared/views/_partials/course-data/shared-course-instructors-edit.component';
import {SharedCourseAnnualDataComponent} from '@app/shared/views/_partials/course-data/shared-course-annual-data.component';
import {SharedCourseJoinDataComponent} from '@app/shared/views/_partials/course-data/shared-course-join-data.component';
import {SharedPrevSponsorDataComponent} from '@app/shared/views/_partials/prev-sponsor-data/shared-prev-sponsor-data.component';
import {SharedPrevSponsorDataEditComponent} from '@app/shared/views/_partials/prev-sponsor-data/shared-prev-sponsor-data-edit.component';
import {SharedQrScannerComponent} from '@app/shared/views/_partials/qr-scanner/shared-qr-scanner.component';

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
    NgxQRCodeModule,
    ZXingScannerModule,
    DeviceDetectorModule.forRoot(),
  ],
  declarations: [
    AlertModalComponent,
    QuestionModalComponent,

    LayoutFooterComponent,

    SharedUserMgmtComponent,
    SharedUserMgmtEditComponent,

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
    SharedEventsDataComponent,
    SharedEventsDataEditComponent,
    SharedEventJoinDataComponent,
    SharedCourseDataComponent,
    SharedCourseDataEditComponent,
    SharedCourseInstructorsComponent,
    SharedCourseInstructorsEditComponent,
    SharedCourseAnnualDataComponent,
    SharedCourseJoinDataComponent,
    SharedPrevSponsorDataComponent,
    SharedPrevSponsorDataEditComponent,
    SharedQrScannerComponent,
  ],
  exports: [
    MDBBootstrapModulesPro,
    StoreModule,
    TranslateModule,
    FormsModule,

    AlertModalComponent,
    QuestionModalComponent,

    LayoutFooterComponent,

    SharedUserMgmtComponent,
    SharedUserMgmtEditComponent,

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
    SharedEventsDataComponent,
    SharedEventsDataEditComponent,
    SharedEventJoinDataComponent,
    SharedCourseDataComponent,
    SharedCourseDataEditComponent,
    SharedCourseInstructorsComponent,
    SharedCourseInstructorsEditComponent,
    SharedCourseAnnualDataComponent,
    SharedCourseJoinDataComponent,
    SharedPrevSponsorDataComponent,
    SharedPrevSponsorDataEditComponent,
    SharedQrScannerComponent,
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
