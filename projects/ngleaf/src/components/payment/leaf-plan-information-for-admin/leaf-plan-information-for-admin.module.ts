import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafPlanInformationForAdminComponent } from './leaf-plan-information-for-admin.component';
import { MatDividerModule } from '@angular/material/divider';
import { LeafPlanViewerModule } from '../leaf-plan-viewer';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { LeafConfirmDialogModule } from '../../common/confirm-dialog/confirm-dialog.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    TranslateModule,
    /* Material deps */
    MatDividerModule,
    MatChipsModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    MatSlideToggleModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    /* Leaf deps */
    LeafPlanViewerModule,
    LeafConfirmDialogModule,
  ],
  declarations: [LeafPlanInformationForAdminComponent],
  exports: [LeafPlanInformationForAdminComponent]
})
export class LeafPlanInformationForAdminModule { }
