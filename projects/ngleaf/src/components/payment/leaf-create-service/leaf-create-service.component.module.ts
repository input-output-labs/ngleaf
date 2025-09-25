import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';

import { LeafCreateServiceComponent } from './leaf-create-service.component';
import { PaymentStoreModule } from '../../../store';
import { LeafIconInputModule } from '../../common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    LeafCreateServiceComponent
  ],
  imports: [
    /* Core deps */
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    /* Material deps */
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    /* Leaf deps */
    PaymentStoreModule,
    MatInputModule,
    LeafIconInputModule,
  ],
  exports: [
    LeafCreateServiceComponent
  ]
})
export class LeafCreateServiceComponentModule { }
