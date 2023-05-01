import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

import { LeafSessionModule } from '../../../../../services/index';
import { AccountSettingsPasswordComponent } from './account-settings-password.component';
import { PasswordUpdateModule } from '../../../password/index';

@NgModule({
  declarations: [AccountSettingsPasswordComponent],
  imports: [
    /* Code deps */
    CommonModule,
    ReactiveFormsModule,
    /* Material deps */
    MatDividerModule,
    MatFormFieldModule,
    MatButtonModule,
    /* Leaf deps*/
    LeafSessionModule,
    PasswordUpdateModule
  ],
  exports: [AccountSettingsPasswordComponent]
})
export class AccountSettingsPasswordModule { }
