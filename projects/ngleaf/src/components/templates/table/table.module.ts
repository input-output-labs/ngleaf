import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { TableComponent } from './table.component';

@NgModule({
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  declarations: [TableComponent],
  exports: [TableComponent]
})
export class TableModule {
}
