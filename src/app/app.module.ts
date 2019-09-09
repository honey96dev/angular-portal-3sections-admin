import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '@app/shared/shared.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MDBSpinningPreloader} from 'ng-uikit-pro-standard';

import {AuthLayoutComponent} from '@app/views/layouts/auth-layout/auth-layout.component';
import {AuthSigninComponent} from '@app/views/auth/signin/auth-signin.component';
import {HomeLayoutComponent} from '@app/views/layouts/home-layout/home-layout.component';
import {HomeFrontComponent} from '@app/views/home/front/home-front.component';
import {CheckForceValidator, ErrorInterceptor, JwtInterceptor, LanguageInterceptor, MatchValueValidator} from '@app/_helpers';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    CheckForceValidator,
    MatchValueValidator,
    AppComponent,
    AuthLayoutComponent,
    AuthSigninComponent,
    HomeLayoutComponent,
    HomeFrontComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    TranslateModule.forRoot(),
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [
    Title,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    MDBSpinningPreloader,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
