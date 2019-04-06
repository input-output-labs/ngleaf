import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree.component';
import { MatButtonModule, MatIconModule, MatTreeModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatTreeModule, MatIconModule, MatButtonModule],
  declarations: [TreeComponent],
  exports: [TreeComponent]
})
export class TreeModule {
}
