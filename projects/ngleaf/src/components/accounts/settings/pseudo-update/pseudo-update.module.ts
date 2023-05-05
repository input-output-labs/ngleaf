import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PseudoUpdateComponent } from './pseudo-update.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LeafSessionModule } from '../../../../services/core/session/leaf-session.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    /* Core deps*/
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    /* Material deps*/
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    /* Leaf deps*/
    LeafSessionModule,
  ],
  declarations: [PseudoUpdateComponent],
  exports: [PseudoUpdateComponent]
})
export class PseudoUpdateModule { }
