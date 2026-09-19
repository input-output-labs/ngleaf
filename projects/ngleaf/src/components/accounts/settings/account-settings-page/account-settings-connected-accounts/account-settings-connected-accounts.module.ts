import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';

import { LeafSessionModule } from '../../../../../services/index';
import { LeafSocialLoginModule } from '../../../social-login/index';
import { AccountSettingsConnectedAccountsComponent } from './account-settings-connected-accounts.component';

@NgModule({
  declarations: [AccountSettingsConnectedAccountsComponent],
  imports: [
    /* Code deps */
    CommonModule,
    TranslateModule,
    /* Material deps */
    MatButtonModule,
    MatDividerModule,
    /* Leaf deps*/
    LeafSessionModule,
    LeafSocialLoginModule,
  ],
  exports: [AccountSettingsConnectedAccountsComponent]
})
export class AccountSettingsConnectedAccountsModule { }
