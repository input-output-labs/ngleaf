import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatInputModule, MatRadioModule, MatSelectModule } from '@angular/material';

import { AddressFormComponent } from './address-form.component';

@NgModule({
  imports: [CommonModule, MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCardModule, ReactiveFormsModule],
  declarations: [AddressFormComponent],
  exports: [AddressFormComponent]
})
export class AddressFormModule {
}
