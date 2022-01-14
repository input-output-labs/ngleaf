import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafLoginVanillaComponent } from './leaf-login-vanilla.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LeafSessionModule } from '../../../services/index';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LeafSessionModule
  ],
  declarations: [LeafLoginVanillaComponent],
  exports: [LeafLoginVanillaComponent]
})
export class LeafLoginVanillaModule { }
