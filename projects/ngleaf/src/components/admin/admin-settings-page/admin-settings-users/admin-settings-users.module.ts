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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';

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
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatListModule,
    MatSelectModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatPaginatorModule,
    /* Leaf deps*/
    LeafAdminModule,
    LeafConfirmDialogModule
  ],
  exports: [AdminSettingsUsersComponent]
})
export class AdminSettingsUsersModule { }
