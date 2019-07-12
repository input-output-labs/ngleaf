import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AccountSettingsGeneralComponent } from './account-settings-general/account-settings-general.component';
import { AccountSettingsAvatarComponent } from './account-settings-avatar/account-settings-avatar.component';
import { AccountSettingsPasswordComponent } from './account-settings-password/account-settings-password.component';
import { AccountSettingsPageComponent } from './account-settings-page.component';
import { AccountSettingsAccessTokensComponent } from './account-settings-access-tokens/account-settings-access-tokens.component';

const routes: Route[] = [
  {
    path: 'settings',
    component: AccountSettingsPageComponent,
    children: [
      {
        path: '',
        redirectTo: '/general',
        pathMatch: 'full',
      },
      {
        path: 'general',
        component: AccountSettingsGeneralComponent,
      },
      {
        path: 'avatar',
        component: AccountSettingsAvatarComponent,
      },
      {
        path: 'password',
        component: AccountSettingsPasswordComponent,
      },
      {
        path: 'accesstokens',
        component: AccountSettingsAccessTokensComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class LeafAccountSettingsPageRouteModule {}
