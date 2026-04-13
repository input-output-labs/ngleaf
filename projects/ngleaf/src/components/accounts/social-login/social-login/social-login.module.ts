import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

import { LeafSessionModule } from '../../../../services/index';
import { LeafSocialLoginComponent } from './social-login.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    LeafSessionModule,
    MatButtonModule,
  ],
  declarations: [LeafSocialLoginComponent],
  exports: [LeafSocialLoginComponent],
})
export class LeafSocialLoginModule {}
