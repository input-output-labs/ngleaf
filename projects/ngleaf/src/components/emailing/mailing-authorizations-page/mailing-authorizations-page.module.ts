import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { TranslateModule } from '@ngx-translate/core';

import { MailingAuthorizationsPageComponent } from './mailing-authorizations-page.component';
import { RouterModule } from '@angular/router';
import { LeafSessionModule } from '../../../services/core/session';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    TranslateModule,
    RouterModule,
    /* Material deps */
    MatButtonModule,
    MatIconModule,
    /* Leaf deps */
    LeafSessionModule
  ],
  declarations: [MailingAuthorizationsPageComponent],
  exports: [MailingAuthorizationsPageComponent]
})
export class MailingAuthorizationsPageModule { }
