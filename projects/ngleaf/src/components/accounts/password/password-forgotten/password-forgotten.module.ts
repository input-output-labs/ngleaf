import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafPasswordForgottenComponent } from './password-forgotten.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LeafPasswordSecurityModule } from '../../../common/password-security';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    ReactiveFormsModule,
    StoreModule,
    TranslateModule,
    /* Material deps */
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    /* Leaf deps */
    LeafPasswordSecurityModule,
  ],
  declarations: [LeafPasswordForgottenComponent],
  exports: [LeafPasswordForgottenComponent]
})
export class LeafPasswordForgottenModule { }
