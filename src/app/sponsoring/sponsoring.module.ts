import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsoringComponent } from './sponsoring.component';

import {
  SponsoringLinkModule,
  SponsoringMyAffiliatesModule,
  SponsoringMySponsorModule,
} from '@input-output-labs/ngleaf';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    /* Leaf deps */
    SponsoringLinkModule,
    SponsoringMySponsorModule,
    SponsoringMyAffiliatesModule
  ],
  declarations: [SponsoringComponent],
  exports: [SponsoringComponent]
})
export class SponsoringModule { }
