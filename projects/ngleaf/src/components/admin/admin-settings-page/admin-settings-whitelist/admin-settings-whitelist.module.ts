import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AdminSettingsWhitelistComponent } from './admin-settings-whitelist.component';
import { LeafAdminModule } from '../../../../services/index';

import { LeafMatFieldModule } from '../../../../directives/mat-field/leaf-mat-field.module';

@NgModule({
  declarations: [AdminSettingsWhitelistComponent],
  imports: [
    LeafMatFieldModule,
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
