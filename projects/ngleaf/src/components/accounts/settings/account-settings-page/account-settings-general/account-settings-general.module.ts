import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountSettingsGeneralComponent } from './account-settings-general.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';

import { LeafSessionModule } from '../../../../../services/index';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
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
