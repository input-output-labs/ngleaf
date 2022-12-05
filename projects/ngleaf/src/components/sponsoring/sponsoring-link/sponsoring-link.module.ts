import {ClipboardModule} from '@angular/cdk/clipboard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsoringLinkComponent } from './sponsoring-link.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
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
