import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatIconModule, MatDividerModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdePopoverModule } from '@material-extended/mde';

import { HttpClient } from '@angular/common/http';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AccountSettingsPasswordComponent } from './account-settings/account-settings-password/account-settings-password.component';
import { AccountSettingsGeneralComponent } from './account-settings/account-settings-general/account-settings-general.component';
import { AccountSettingsAvatarComponent } from './account-settings/account-settings-avatar/account-settings-avatar.component';
import { LeafComponentCommonModule } from '../common/LeafComponentCommon.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatDividerModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    LeafComponentCommonModule
  ],
  declarations: [
    AccountSettingsComponent,
    AccountSettingsPasswordComponent,
    AccountSettingsGeneralComponent,
    AccountSettingsAvatarComponent
  ],
  exports: [
    AccountSettingsComponent,
    AccountSettingsPasswordComponent,
    AccountSettingsGeneralComponent,
    AccountSettingsAvatarComponent
  ]
})
export class LeafComponentPagesModule {
}
