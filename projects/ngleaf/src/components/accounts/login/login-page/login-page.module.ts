import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatDividerModule } from '@angular/material/divider';

import { LeafLoginModule } from '../login/login.module';
import { LoginPageComponent } from './login-page.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    /* Code deps */
    CommonModule,
    TranslateModule,
    /* Material deps */
    MatCardModule,
    MatDividerModule,
    /* Leaf deps*/
    LeafLoginModule,
  ],
  exports: [LoginPageComponent]
})
export class LeafLoginPageModule { }
