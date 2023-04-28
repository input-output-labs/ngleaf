import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

import { AdminSettingsWhitelistComponent } from './admin-settings-whitelist.component';
import { LeafAdminModule } from '../../../../services/index';

@NgModule({
  declarations: [AdminSettingsWhitelistComponent],
  imports: [
    /* Code deps */
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /* Material deps */
    MatDividerModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    /* Leaf deps*/
    LeafAdminModule
  ],
  exports: [AdminSettingsWhitelistComponent]
})
export class AdminSettingsWhitelistModule { }
