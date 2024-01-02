import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { LeafPlanSelectorModule, LeafSelectedPaymentPlanModule, LeafInvoicesListModule } from '@input-output-labs/ngleaf';
import { PaymentComponent } from './payment.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    /* Material deps */
    MatDividerModule,
    MatCardModule,
    /* Leaf deps */
    LeafPlanSelectorModule,
    LeafSelectedPaymentPlanModule,
    LeafInvoicesListModule,
  ],
  declarations: [PaymentComponent],
  exports: [PaymentComponent]
})
export class PaymentModule { }
