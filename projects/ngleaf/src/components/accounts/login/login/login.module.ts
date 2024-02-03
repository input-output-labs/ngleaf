import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';

import { LeafSessionModule } from '../../../../services/index';
import { LeafLoginComponent } from './login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LeafSessionModule,
    TranslateModule,
    StoreModule,
    /* Material deps */
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [LeafLoginComponent],
  exports: [LeafLoginComponent]
})
export class LeafLoginModule { }
