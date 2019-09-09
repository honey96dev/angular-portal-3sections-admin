import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthLayoutComponent} from '@app/views/layouts/auth-layout/auth-layout.component';
import {AuthSigninComponent} from '@app/views/auth/signin/auth-signin.component';
import {HomeLayoutComponent} from '@app/views/layouts/home-layout/home-layout.component';
import {HomeFrontComponent} from '@app/views/home/front/home-front.component';
import {AuthGuard} from '@app/_helpers';


const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {path: '', component: AuthSigninComponent},
    ],
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeLayoutComponent,
    children: [
      {path: '', component: HomeFrontComponent},
    ],
  },
  {
    path: 'human',
    canActivate: [AuthGuard],
    loadChildren: () => import('@app/human/human.module').then(module => module.HumanModule),
  },
  {
    path: 'conference',
    canActivate: [AuthGuard],
    loadChildren: () => import('@app/conference/conference.module').then(module => module.ConferenceModule),
  },
  {
    path: 'business',
    canActivate: [AuthGuard],
    loadChildren: () => import('@app/business/business.module').then(module => module.BusinessModule),
  },
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
