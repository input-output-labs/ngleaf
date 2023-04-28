import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountSettingsAccessTokensComponent } from './account-settings-access-tokens.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';

import { LeafSessionModule } from '../../../../../services/index';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

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
    MatInputModule,
    MatDatepickerModule,
    MatTableModule,
    /* Leaf deps*/
    LeafSessionModule
  ],
  exports: [AccountSettingsAccessTokensComponent]
})
export class AccountSettingsAccessTokensModule { }
