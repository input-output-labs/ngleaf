import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordPageComponent } from './password-page.component';
import { LeafPasswordForgottenModule } from '@input-output-labs/ngleaf';
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
    LeafPasswordForgottenModule,
  ],
  declarations: [PasswordPageComponent],
  exports: [PasswordPageComponent]
})
export class PasswordPageModule { }
