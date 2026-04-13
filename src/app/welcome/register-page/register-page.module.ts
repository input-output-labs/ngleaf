import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './register-page.component';
import { LeafRegisterModule, LeafSocialLoginModule } from '@input-output-labs/ngleaf';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    RouterModule,
    TranslateModule,
    /* Material deps */
    MatDividerModule,
    /* Leaf deps */
    LeafRegisterModule,
    LeafSocialLoginModule,
  ],
  declarations: [RegisterPageComponent],
  exports: [RegisterPageComponent]
})
export class RegisterPageModule { }
