import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

import { EmailVerificationComponent } from './email-verification.component';
import { ReactiveFormsModule } from '@angular/forms';

import { LeafMatFieldModule } from '../../../directives/mat-field/leaf-mat-field.module';

@NgModule({
  imports: [
    LeafMatFieldModule,
    /* Core deps*/
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    /* Material deps */
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [EmailVerificationComponent],
  exports: [EmailVerificationComponent]
})
export class EmailVerificationModule { }
