import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountSettingsGeneralComponent } from './account-settings-general.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LeafSessionModule } from '../../../../services/index';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AccountSettingsGeneralComponent],
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
  ],
  exports: [AccountSettingsGeneralComponent]
})
export class AccountSettingsGeneralModule { }
