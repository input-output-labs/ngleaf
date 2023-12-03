import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardComponent } from './credit-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CreditCardComponent],
  exports: [CreditCardComponent]
})
export class CreditCardModule { }
