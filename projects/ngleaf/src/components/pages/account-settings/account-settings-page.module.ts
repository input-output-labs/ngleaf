import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule, MatInputModule, MatButtonModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { AccountSettingsPageComponent } from './account-settings-page.component';
import { AccountSettingsPasswordComponent } from './account-settings-password/account-settings-password.component';
import { AccountSettingsGeneralComponent } from './account-settings-general/account-settings-general.component';
import { AccountSettingsAvatarComponent } from './account-settings-avatar/account-settings-avatar.component';
import { AppSettingsPageRouteModule } from './account-settings-page.route';

import { LeafComponentsCommonModule } from '../../common';
import { LeafServiceModule } from '../../../services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AccountSettingsPageComponent,
    AccountSettingsPasswordComponent,
    AccountSettingsGeneralComponent,
    AccountSettingsAvatarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    /* Material Imports */
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    /* Leaf Imports */
    LeafComponentsCommonModule,
    LeafServiceModule,
    AppSettingsPageRouteModule,
  ],
  exports: [
    AccountSettingsPageComponent,
    AccountSettingsPasswordComponent,
    AccountSettingsGeneralComponent,
    AccountSettingsAvatarComponent,
  ],
})
export class AccountSettingsPageModule {}
