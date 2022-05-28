import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { LeafForbiddenComponent } from './forbidden.component';

@NgModule({
  declarations: [LeafForbiddenComponent],
  imports: [
    /* Code deps */
    CommonModule,
    /* Material deps */
    MatCardModule,
    MatDividerModule,
    /* Leaf deps*/
  ],
  exports: [LeafForbiddenComponent]
})
export class LeafForbiddenModule {}
