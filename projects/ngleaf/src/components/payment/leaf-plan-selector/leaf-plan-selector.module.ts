import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafPlanSelectorComponent } from './leaf-plan-selector.component';
import { LeafPlanViewerModule } from '../leaf-plan-viewer';
import { PaymentStoreModule } from '../../../store/payment/payment-store.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    TranslateModule,
    /* Material deps */
    MatProgressBarModule,
    MatButtonModule,
    /* Leaf deps */
    LeafPlanViewerModule,
    PaymentStoreModule,
  ],
  declarations: [LeafPlanSelectorComponent],
  exports: [LeafPlanSelectorComponent]
})
export class LeafPlanSelectorModule { }
