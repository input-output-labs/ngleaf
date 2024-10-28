import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneNumberFormFieldComponent } from './phone-number-form-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    /* Material deps */
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  declarations: [PhoneNumberFormFieldComponent],
  exports: [PhoneNumberFormFieldComponent]
})
export class PhoneNumberFormFieldModule { }
