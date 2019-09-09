import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MDBBootstrapModulesPro} from 'ng-uikit-pro-standard';
import {TranslateModule} from '@ngx-translate/core';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from '@core/reducers';
import {AlertModalComponent} from '@app/shared/views/_partials/common-dialogs/alert/alert-modal.component';
import {QuestionModalComponent} from '@app/shared/views/_partials/common-dialogs/question/question-modal.component';
import {LayoutFooterComponent} from '@app/views/layouts/_partials/footer/layout-footer.component';
import {SharedMediaSliderDataComponent} from '@app/shared/views/_partials/media-slider-data/shared-media-slider-data.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedMediaSliderDataEditComponent} from '@app/shared/views/_partials/media-slider-data/shared-media-slider-data-edit.component';
import {RouterModule} from '@angular/router';
import {DROPZONE_CONFIG, DropzoneModule, DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {environment} from '@environments/environment';
import {apis} from '@core/apis';

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
  ],
  declarations: [
    AlertModalComponent,
    QuestionModalComponent,

    LayoutFooterComponent,

    SharedMediaSliderDataComponent,
    SharedMediaSliderDataEditComponent,
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
