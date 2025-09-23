import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { LeafPlanSelectorModule, LeafCreateServiceComponentModule, LeafSelectedPaymentPlanModule, LeafInvoicesListModule, LeafCustomerDefaultPaymentCardModule, LeafPlanInformationForAdminModule } from '../../../../projects/ngleaf/src/public-api';
import { LeafServicesListComponentModule } from '../../../../projects/ngleaf/src/components/payment/leaf-services-list';
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
    LeafCustomerDefaultPaymentCardModule,
    LeafPlanInformationForAdminModule,
    LeafCreateServiceComponentModule,
    LeafServicesListComponentModule
  ],
  declarations: [PaymentComponent],
  exports: [PaymentComponent]
})
export class PaymentModule { }
