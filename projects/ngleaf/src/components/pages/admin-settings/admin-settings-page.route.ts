import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AdminSettingsPageComponent } from './admin-settings-page.component';
import { AdminSettingsAdministratorsComponent } from './admin-settings-administrators/admin-settings-administrators.component';
import { AdminSettingsWhitelistComponent } from './admin-settings-whitelist/admin-settings-whitelist.component';
import { LeafAdminGuardService } from '../../..//guards';

const routes: Route[] = [
  {
    path: 'admin',
    canActivate: [LeafAdminGuardService],
    component: AdminSettingsPageComponent,
    children: [
      {
        path: '',
        redirectTo: '/admin/administrators',
        pathMatch: 'full',
      },
      {
        path: 'administrators',
        component: AdminSettingsAdministratorsComponent,
      },
      {
        path: 'whitelist',
        component: AdminSettingsWhitelistComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class LeafAdminSettingsPageRouteModule {}
