import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionsBarComponent } from './sections-bar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SectionsBarComponent],
  exports: [SectionsBarComponent]
})
export class SectionsBarModule { }
