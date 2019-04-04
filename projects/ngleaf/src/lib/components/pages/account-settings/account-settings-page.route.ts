import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';

import {AccountSettingsGeneralComponent} from './account-settings-general/account-settings-general.component';
import {AccountSettingsAvatarComponent} from './account-settings-avatar/account-settings-avatar.component';
import {AccountSettingsPasswordComponent} from './account-settings-password/account-settings-password.component';
import {AccountSettingsPageComponent} from './account-settings-page.component';

const routes: Route[] = [
  {
    path: 'settings', component: AccountSettingsPageComponent, children: [
      {path: '', redirectTo: 'general', pathMatch: 'full'},
      {path: 'general', component: AccountSettingsGeneralComponent, outlet: 'account'},
      {path: 'avatar', component: AccountSettingsAvatarComponent, outlet: 'account'},
      {path: 'password', component: AccountSettingsPasswordComponent, outlet: 'account'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppSettingsPageRouteModule {
}
