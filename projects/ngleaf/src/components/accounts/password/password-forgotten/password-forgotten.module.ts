import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafPasswordForgottenComponent } from './password-forgotten.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    StoreModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [LeafPasswordForgottenComponent],
  exports: [LeafPasswordForgottenComponent]
})
export class LeafPasswordForgottenModule { }
