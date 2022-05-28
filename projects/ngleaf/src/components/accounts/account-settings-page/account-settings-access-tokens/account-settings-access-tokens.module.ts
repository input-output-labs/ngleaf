import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountSettingsAccessTokensComponent } from './account-settings-access-tokens.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';

import { LeafSessionModule } from '../../../../services/index';

@NgModule({
  declarations: [AccountSettingsAccessTokensComponent],
  imports: [
    /* Code deps */
    CommonModule,
    ReactiveFormsModule,
    /* Material deps */
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatTableModule,
    /* Leaf deps*/
    LeafSessionModule
  ],
  exports: [AccountSettingsAccessTokensComponent]
})
export class AccountSettingsAccessTokensModule { }
