import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { AccountSettingsProfileComponent } from './account-settings-profile.component';
import { ProfileUpdateModule } from '../../profile-update';

@NgModule({
  declarations: [AccountSettingsProfileComponent],
  imports: [
    /* Code deps */
    CommonModule,
    ReactiveFormsModule,
    /* Material deps */
    MatDividerModule,
    MatFormFieldModule,
    MatButtonModule,
    /* Leaf deps*/
    ProfileUpdateModule,
  ],
  exports: [AccountSettingsProfileComponent]
})
export class AccountSettingsProfileModule { }
