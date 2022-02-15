import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafPasswordForgottenVanillaComponent } from './leaf-password-forgotten-vanilla.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    StoreModule,
  ],
  declarations: [LeafPasswordForgottenVanillaComponent],
  exports: [LeafPasswordForgottenVanillaComponent]
})
export class LeafPasswordForgottenVanillaModule { }
