import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LeafSessionModule } from '../../../services/core/session/index';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    /* Code deps */
    CommonModule,
    ReactiveFormsModule,
    /* Material deps */
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    /* Leaf deps*/
    LeafSessionModule
  ],
  exports: [LoginComponent]
})
export class LeafLoginModule { }
