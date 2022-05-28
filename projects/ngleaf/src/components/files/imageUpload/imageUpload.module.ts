import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeafUploadFileModule } from '../../../services/files/index';
import { LeafImageUploadComponent } from './imageUpload.component';

@NgModule({
  imports: [
    CommonModule,
    /* Material */
    /* Leaf deps */
    LeafUploadFileModule
  ],
  declarations: [LeafImageUploadComponent],
  exports: [LeafImageUploadComponent]
})
export class LeafImageUploadModule { }
