import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsoringMyAffiliatesComponent } from './sponsoring-my-affiliates.component';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    TranslateModule,
    /* Material deps */
    MatChipsModule
  ],
  declarations: [SponsoringMyAffiliatesComponent],
  exports: [SponsoringMyAffiliatesComponent]
})
export class SponsoringMyAffiliatesModule { }
