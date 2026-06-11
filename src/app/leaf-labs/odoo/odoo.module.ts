import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import {
  OdooContactSelectorModule,
  OdooOpportunitySelectorModule,
} from '../../../../projects/ngleaf/src/public-api';
import { OdooComponent } from './odoo.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    MatDividerModule,
    MatCardModule,
    OdooContactSelectorModule,
    OdooOpportunitySelectorModule,
  ],
  declarations: [OdooComponent],
  exports: [OdooComponent],
})
export class OdooModule {}
