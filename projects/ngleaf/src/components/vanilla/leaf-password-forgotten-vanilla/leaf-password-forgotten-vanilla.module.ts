import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafPasswordForgottenVanillaComponent } from './leaf-password-forgotten-vanilla.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [LeafPasswordForgottenVanillaComponent],
  exports: [LeafPasswordForgottenVanillaComponent]
})
export class LeafPasswordForgottenVanillaModule { }
