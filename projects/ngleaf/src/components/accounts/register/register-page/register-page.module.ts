import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatDividerModule } from '@angular/material/divider';

import { RegisterPageComponent } from './register-page.component';
import { LeafRegisterModule } from '../register/index';

@NgModule({
  declarations: [RegisterPageComponent],
  imports: [
    /* Code deps */
    CommonModule,
    /* Material deps */
    MatCardModule,
    MatDividerModule,
    /* Leaf deps*/
    LeafRegisterModule,
  ],
  exports: [RegisterPageComponent]
})
export class LeafRegisterPageModule { }
