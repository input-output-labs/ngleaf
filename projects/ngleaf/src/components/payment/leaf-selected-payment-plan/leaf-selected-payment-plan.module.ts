import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafSelectedPaymentPlanComponent } from './leaf-selected-payment-plan.component';
import { LeafPlanViewerModule } from '../leaf-plan-viewer';
import { PaymentStoreModule } from '../../../store/payment/payment-store.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CreditCardModule } from '../credit-card';
import { PaymentApiClientModule } from '../../../api/clients/payment-api-client';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { LeafPlanSelectorDialogModule } from '../leaf-plan-selector-dialog';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    /* Material deps */
    MatDividerModule,
    MatTableModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    /* Leaf deps */
    LeafPlanViewerModule,
    PaymentStoreModule,
    CreditCardModule,
    PaymentApiClientModule,
    LeafPlanSelectorDialogModule,
  ],
  declarations: [LeafSelectedPaymentPlanComponent],
  exports: [LeafSelectedPaymentPlanComponent],
})
export class LeafSelectedPaymentPlanModule { }
