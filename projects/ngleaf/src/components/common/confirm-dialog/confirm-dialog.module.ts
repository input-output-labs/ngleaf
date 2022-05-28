import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

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
