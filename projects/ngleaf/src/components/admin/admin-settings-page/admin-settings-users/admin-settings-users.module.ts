import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { AdminSettingsUsersComponent } from './admin-settings-users.component';
import { LeafAdminModule } from '../../../../services/index';

@NgModule({
  declarations: [AdminSettingsUsersComponent],
  imports: [
    /* Code deps */
    CommonModule,
    ReactiveFormsModule,
    /* Material deps */
    MatDividerModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    /* Leaf deps*/
    LeafAdminModule
  ],
  exports: [AdminSettingsUsersComponent]
})
export class AdminSettingsUsersModule { }
