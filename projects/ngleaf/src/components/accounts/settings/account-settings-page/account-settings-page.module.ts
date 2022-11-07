import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AccountSettingsPageComponent } from './account-settings-page.component';
import { AccountSettingsAccessTokensModule } from './account-settings-access-tokens/index';
import { AccountSettingsAvatarModule } from './account-settings-avatar/index';
import { AccountSettingsGeneralModule } from './account-settings-general/index';

@NgModule({
  declarations: [AccountSettingsPageComponent],
  imports: [
    /* Code deps */
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    /* Material deps */
    /* Leaf deps*/
    AccountSettingsAccessTokensModule,
    AccountSettingsAvatarModule,
    AccountSettingsGeneralModule,
  ],
  exports: [AccountSettingsPageComponent]
})
export class AccountSettingsPageModule { }
