import { Route } from '@angular/router';

import { LeafAdminGuardService, LeafAuthGuardService } from '../../../guards/index';

import { AdminSettingsPageComponent } from './admin-settings-page.component';
import { AdminSettingsAdministratorsComponent } from './admin-settings-administrators/admin-settings-administrators.component';
import { AdminSettingsWhitelistComponent } from './admin-settings-whitelist/admin-settings-whitelist.component';
import { AdminSettingsUsersComponent } from './admin-settings-users/admin-settings-users.component';
import { EmailingPageComponent } from '../../emailing';

export const adminSettingsPageRoutes: Route[] = [
  {
    path: 'admin',
    canActivate: [/*LeafAdminGuardService, LeafAuthGuardService*/],
    component: AdminSettingsPageComponent,
    children: [
      {
        path: '',
        redirectTo: '/admin/users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: AdminSettingsUsersComponent,
      },
      {
        path: 'administrators',
        component: AdminSettingsAdministratorsComponent,
      },
      {
        path: 'whitelist',
        component: AdminSettingsWhitelistComponent,
      },
      {
        path: 'emailing',
        component: EmailingPageComponent,
      }
    ],
  }
];
