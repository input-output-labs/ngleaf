import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { LeafServicesListComponent } from './leaf-services-list.component';
import { PaymentStoreModule } from '../../../store';
import { LeafServiceItemComponentModule } from '../leaf-service-item';

@NgModule({
  declarations: [
    LeafServicesListComponent,
  ],
  imports: [
    /* Core deps */
    CommonModule,
    TranslateModule,
    /* Material deps */
    MatProgressSpinnerModule,
    MatIconModule,
    /* Leaf deps */
    PaymentStoreModule,
    LeafServiceItemComponentModule
  ],
  exports: [
    LeafServicesListComponent,
  ]
})
export class LeafServicesListComponentModule { }
