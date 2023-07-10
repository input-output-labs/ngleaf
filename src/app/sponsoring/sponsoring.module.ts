import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsoringComponent } from './sponsoring.component';

import {
  SponsoringCodeUpdateModule,
  SponsoringLinkModule,
  SponsoringMyAffiliatesModule,
  SponsoringMySponsorModule,
} from '@input-output-labs/ngleaf';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    /* Leaf deps */
    SponsoringCodeUpdateModule,
    SponsoringLinkModule,
    SponsoringMySponsorModule,
    SponsoringMyAffiliatesModule,
  ],
  declarations: [SponsoringComponent],
  exports: [SponsoringComponent]
})
export class SponsoringModule { }
