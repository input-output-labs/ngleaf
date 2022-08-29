import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import {
  LoginPageComponent,
  RegisterPageComponent,
  LeafForbiddenComponent,
  LeafForbiddenModule,
  accountSettingsPageRoutes,
  adminSettingsPageRoutes,
  LeafAdminGuardModule,
  LeafAuthGuardModule,
  StatisticsPageComponent,
  StatisticsPageModule,
  MailingAuthorizationsPageComponent,
  MailingAuthorizationsPageModule,
} from '@input-output-labs/ngleaf';
import { MessengerComponent } from './messenger/messenger.component';
import { MessengerModule } from './messenger/messenger.module';
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
    path: 'messenger',
    component: MessengerComponent,
  },
  {
    path: 'statistics',
    component: StatisticsPageComponent,
  },
  {
    path: 'forbidden',
    component: LeafForbiddenComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'mailings/unsubscribe',
    component: MailingAuthorizationsPageComponent,
  },
  ...accountSettingsPageRoutes,
  ...adminSettingsPageRoutes
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LeafAdminGuardModule,
    LeafAuthGuardModule,
    StatisticsPageModule,
    LeafForbiddenModule,
    MailingAuthorizationsPageModule,
    MessengerModule,
  ], // add { enableTracing: true } after routes in forRoot to debug the router
  exports: [RouterModule],
})
export class AppRouteModule {}

