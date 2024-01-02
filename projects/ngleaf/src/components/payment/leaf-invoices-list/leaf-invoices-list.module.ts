import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafInvoicesListComponent } from './leaf-invoices-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    TranslateModule,
    /* Material deps */
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
  ],
  declarations: [LeafInvoicesListComponent],
  exports: [LeafInvoicesListComponent]
})
export class LeafInvoicesListModule { }
