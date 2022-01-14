import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LeafRegisterVanillaComponent } from './leaf-register-vanilla.component';
import { LeafSessionModule } from '../../../services/index';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LeafSessionModule
  ],
  declarations: [LeafRegisterVanillaComponent],
  exports: [LeafRegisterVanillaComponent]
})
export class LeafRegisterVanillaModule { }
