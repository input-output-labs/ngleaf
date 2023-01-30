import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { AdminSettingsUsersComponent } from './admin-settings-users.component';
import { LeafAdminModule } from '../../../../services/index';
import { LeafConfirmDialogModule } from '../../../common/confirm-dialog/confirm-dialog.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';

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
    MatDialogModule,
    MatMenuModule,
    MatListModule,
    /* Leaf deps*/
    LeafAdminModule,
    LeafConfirmDialogModule
  ],
  exports: [AdminSettingsUsersComponent]
})
export class AdminSettingsUsersModule { }
