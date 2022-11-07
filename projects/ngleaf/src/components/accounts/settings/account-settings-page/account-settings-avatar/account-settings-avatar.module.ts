import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsAvatarComponent } from './account-settings-avatar.component';
import { MatDividerModule } from '@angular/material/divider';

import { AvatarUpdateModule } from '../../avatar-update/avatar-update.module';

@NgModule({
  declarations: [AccountSettingsAvatarComponent],
  imports: [
    /* Code deps */
    CommonModule,
    /* Material deps */
    MatDividerModule,
    /* Leaf deps*/
    AvatarUpdateModule
  ],
  exports: [AccountSettingsAvatarComponent]
})
export class AccountSettingsAvatarModule { }
