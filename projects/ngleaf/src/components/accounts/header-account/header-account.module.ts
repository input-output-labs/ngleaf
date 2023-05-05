import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RouterModule } from '@angular/router';

import { LeafHeaderAccountComponent } from './header-account.component';
import { LeafAccountPopoverContentComponent } from './account-popover-content';

@NgModule({
  declarations: [LeafHeaderAccountComponent, LeafAccountPopoverContentComponent],
  imports: [
    /* Code deps */
    CommonModule,
    RouterModule,
    /* Material deps */
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    /* Leaf deps*/
  ],
  exports: [LeafHeaderAccountComponent]
})
export class LeafHeaderAccountModule { }
