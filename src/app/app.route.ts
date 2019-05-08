import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AccountSettingsPageComponent, AdminSettingsPageComponent, LoginPageComponent } from '@iolabs/ngleaf';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // add { enableTracing: true } after routes in forRoot to debug the router
  exports: [RouterModule],
})
export class AppRouteModule {}
