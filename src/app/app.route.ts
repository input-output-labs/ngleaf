import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import {
  LeafForbiddenComponent,
  LeafForbiddenModule,
  adminSettingsPageRoutes,
  LeafAdminGuardModule,
  LeafAuthGuardModule,
  StatisticsPageModule,
  MailingAuthorizationsPageComponent,
  MailingAuthorizationsPageModule,
  LeafAuthGuardService,
  LeafOrganizationSelectedGuardModule,
} from '@input-output-labs/ngleaf';
import { MainLayoutComponent } from '../components/main-layout/main-layout.component';
import { MainLayoutModule } from '../components/main-layout/main-layout.module';

const routes: Route[] = [
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: '',
    canActivate: [LeafAuthGuardService],
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'leaf-labs',
        loadChildren: () => import('./leaf-labs/leaf-labs.module').then(m => m.LeafLabsModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./account-settings/account-settings.module').then(m => m.AccountSettingsModule)
      },
      {
        path: 'organization',
        loadChildren: () => import('./organization-settings/organization-settings.module').then(m => m.OrganizationSettingsModule)
      },
    ]
  },
  {
    path: 'forbidden',
    component: LeafForbiddenComponent,
  },
  {
    path: 'mailings/unsubscribe',
    component: MailingAuthorizationsPageComponent,
  },
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
    LeafOrganizationSelectedGuardModule,
    MainLayoutModule,
  ], // add { enableTracing: true } after routes in forRoot to debug the router
  exports: [RouterModule],
})
export class AppRouteModule {}

