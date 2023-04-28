import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';


import { LeafConfirmDialogComponent } from './confirm-dialog.component';

@NgModule({
  declarations: [LeafConfirmDialogComponent],
  imports: [
    /* Code deps */
    CommonModule,
    /* Material deps */
    MatDialogModule,
    MatButtonModule,
    /* Leaf deps*/
  ],
  exports: [LeafConfirmDialogComponent]
})
export class LeafConfirmDialogModule {}
