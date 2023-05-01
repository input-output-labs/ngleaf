import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsoringMySponsorComponent } from './sponsoring-my-sponsor.component';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { SponsoringApiClientModule } from '../../../api/clients/index';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    /* Material deps */
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    /* Leaf deps */
    SponsoringApiClientModule,
  ],
  declarations: [SponsoringMySponsorComponent],
  exports: [SponsoringMySponsorComponent]
})
export class SponsoringMySponsorModule { }
