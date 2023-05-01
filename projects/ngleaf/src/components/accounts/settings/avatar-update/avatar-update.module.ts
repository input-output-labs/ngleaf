import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarUpdateComponent } from './avatar-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { LeafImageUploadModule } from '../../../files';
import { LeafSessionModule } from '../../../../services';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
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
