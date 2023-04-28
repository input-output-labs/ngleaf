import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

import { AdminSettingsUsersComponent } from './admin-settings-users.component';
import { LeafAdminModule } from '../../../../services/index';
import { LeafConfirmDialogModule } from '../../../common/confirm-dialog/confirm-dialog.module';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';

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
