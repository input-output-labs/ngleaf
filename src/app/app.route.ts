import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import {
  LoginPageComponent,
  RegisterPageComponent,
  ForbiddenComponent,
  accountSettingsPageRoutes,
  adminSettingsPageRoutes,
  LeafAdminGuardModule,
  LeafAuthGuardModule
} from '@input-output-labs/ngleaf';
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
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  ...accountSettingsPageRoutes,
  ...adminSettingsPageRoutes
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LeafAdminGuardModule,
    LeafAuthGuardModule
  ], // add { enableTracing: true } after routes in forRoot to debug the router
  exports: [RouterModule],
})
export class AppRouteModule {}
