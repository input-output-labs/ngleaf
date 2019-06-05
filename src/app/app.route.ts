import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import {
  AccountSettingsPageComponent,
  AdminSettingsPageComponent,
  LoginPageComponent,
  RegisterPageComponent,
  LeafAuthGuardService } from '@iolabs/ngleaf';
import { TemplatesComponent } from './templates/templates.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: '/settings',
    pathMatch: 'full',
  },
  {
    path: 'templates',
    component: TemplatesComponent,
  },
  {
    path: 'settings',
    canActivate: [LeafAuthGuardService],
    component: AccountSettingsPageComponent,
  },
  {
    path: 'admin',
    component: AdminSettingsPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // add { enableTracing: true } after routes in forRoot to debug the router
  exports: [RouterModule],
})
export class AppRouteModule {}
