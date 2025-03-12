import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafCustomerDefaultPaymentCardComponent } from './leaf-customer-default-payment-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PaymentStoreModule } from '../../../store';
import { CreditCardModule } from '../credit-card/credit-card.module';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    TranslateModule,
    /* Material deps */
    MatCardModule,
    MatButtonModule,
    /* Leaf deps */
    PaymentStoreModule,
    CreditCardModule,
  ],
  declarations: [LeafCustomerDefaultPaymentCardComponent],
  exports: [LeafCustomerDefaultPaymentCardComponent]
})
export class LeafCustomerDefaultPaymentCardModule { }
