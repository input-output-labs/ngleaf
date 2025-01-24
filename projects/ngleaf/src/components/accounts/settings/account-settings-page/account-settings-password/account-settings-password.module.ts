import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { LeafSessionModule } from '../../../../../services/index';
import { AccountSettingsPasswordComponent } from './account-settings-password.component';
import { PasswordUpdateModule } from '../../../password/index';
import { MatDialogModule } from '@angular/material/dialog';

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
    MatDialogModule,
    /* Leaf deps*/
    LeafSessionModule,
    PasswordUpdateModule
  ],
  exports: [AccountSettingsPasswordComponent]
})
export class AccountSettingsPasswordModule { }
