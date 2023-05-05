import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { LeafSessionModule } from '../../../../services/core/session/index';
import { RegisterComponent } from './register.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    /* Code deps */
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    /* Material deps */
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    /* Leaf deps*/
    LeafSessionModule
  ],
  exports: [RegisterComponent]
})
export class LeafRegisterModule { }
