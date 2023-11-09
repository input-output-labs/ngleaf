import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { LeafPlanSelectorModule } from '@input-output-labs/ngleaf';
import { PaymentComponent } from './payment.component';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    /* Material deps */
    MatDividerModule,
    /* Leaf deps */
    LeafPlanSelectorModule
  ],
  declarations: [PaymentComponent],
  exports: [PaymentComponent]
})
export class PaymentModule { }
