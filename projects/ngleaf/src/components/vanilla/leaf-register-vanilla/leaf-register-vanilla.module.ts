import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LeafRegisterVanillaComponent } from './leaf-register-vanilla.component';
import { LeafSessionModule } from '../../../services/index';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LeafSessionModule,
    TranslateModule,
  ],
  declarations: [LeafRegisterVanillaComponent],
  exports: [LeafRegisterVanillaComponent]
})
export class LeafRegisterVanillaModule { }
