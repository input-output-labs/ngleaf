import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule, MatInputModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';

import {AccountSettingsPageComponent} from './account-settings-page.component';
import {AccountSettingsPasswordComponent} from './account-settings-password/account-settings-password.component';
import {AccountSettingsGeneralComponent} from './account-settings-general/account-settings-general.component';
import {AccountSettingsAvatarComponent} from './account-settings-avatar/account-settings-avatar.component';

import {LeafComponentsCommonModule} from '../../common';
import {LeafServiceModule} from '../../../services';

@NgModule({
  declarations: [
    AccountSettingsPageComponent,
    AccountSettingsPasswordComponent,
    AccountSettingsGeneralComponent,
    AccountSettingsAvatarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    /* Material Imports */
    MatInputModule,
    MatDividerModule,
    /* Leaf Imports */
    LeafComponentsCommonModule,
    LeafServiceModule,
  ],
  exports: [
    AccountSettingsPageComponent,
    AccountSettingsPasswordComponent,
    AccountSettingsGeneralComponent,
    AccountSettingsAvatarComponent
  ]
})
export class AccountSettingsPageModule {
}
