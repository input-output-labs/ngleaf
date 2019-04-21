import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AdminSettingsPageComponent } from './admin-settings-page.component';
import { AdminSettingsAdministratorsComponent } from './admin-settings-administrators/admin-settings-administrators.component';

const routes: Route[] = [
  {
    path: 'admin',
    component: AdminSettingsPageComponent,
    children: [
      {
        path: '',
        redirectTo: '/administrators',
        pathMatch: 'full',
      },
      {
        path: 'administrators',
        component: AdminSettingsAdministratorsComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class AppSettingsPageRouteModule {}
