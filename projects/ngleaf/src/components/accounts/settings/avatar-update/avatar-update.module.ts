import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarUpdateComponent } from './avatar-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LeafImageUploadModule } from '../../../files';
import { LeafSessionModule } from '../../../../services';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    ReactiveFormsModule,
    /* Material deps */
    MatButtonModule,
    /* Leaf deps */
    LeafSessionModule,
    LeafImageUploadModule,
  ],
  declarations: [AvatarUpdateComponent],
  exports: [AvatarUpdateComponent]
})
export class AvatarUpdateModule { }
