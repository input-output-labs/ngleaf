import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountSettingsGeneralComponent } from './account-settings-general.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LeafSessionModule } from '../../../../../services/index';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PseudoUpdateModule } from '../../pseudo-update';

@NgModule({
  declarations: [AccountSettingsGeneralComponent],
  imports: [
    /* Code deps */
    CommonModule,
    ReactiveFormsModule,
    /* Material deps */
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    /* Leaf deps*/
    LeafSessionModule,
    PseudoUpdateModule,
  ],
  exports: [AccountSettingsGeneralComponent]
})
export class AccountSettingsGeneralModule { }
