import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

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
