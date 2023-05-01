import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatLegacyTabsModule as MatTabsModule} from '@angular/material/legacy-tabs';

import { EmailingPageComponent } from './emailing-page.component';
import { EmailingCategoriesPageModule } from '../emailing-categories-page';
import { EmailingSendingPageModule } from '../emailing-sending-page';

@NgModule({
  imports: [
    /* Common deps */
    CommonModule,
    /* Material deps */
    MatTabsModule,
    /* Leaf deps */
    EmailingCategoriesPageModule,
    EmailingSendingPageModule
  ],
  declarations: [EmailingPageComponent],
  exports: [EmailingPageComponent]
})
export class EmailingPageModule { }
