import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountSettingsAvatarComponent } from './account-settings-avatar.component';
import { MatDividerModule } from '@angular/material/divider';

import { LeafSessionModule } from '../../../../services/index';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AccountSettingsAvatarComponent],
  imports: [
    /* Code deps */
    CommonModule,
    ReactiveFormsModule,
    /* Material deps */
    MatDividerModule,
    MatButtonModule,
    /* Leaf deps*/
    LeafSessionModule,
  ],
  exports: [AccountSettingsAvatarComponent]
})
export class AccountSettingsAvatarModule { }
