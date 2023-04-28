import {ClipboardModule} from '@angular/cdk/clipboard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsoringLinkComponent } from './sponsoring-link.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    TranslateModule,
    /* Material deps */
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ClipboardModule,
    MatTooltipModule,
  ],
  declarations: [SponsoringLinkComponent],
  exports: [SponsoringLinkComponent]
})
export class SponsoringLinkModule { }
