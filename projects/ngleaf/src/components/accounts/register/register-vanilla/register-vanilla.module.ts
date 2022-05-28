import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LeafRegisterVanillaComponent } from './register-vanilla.component';
import { LeafSessionModule } from '../../../../services/index';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LeafSessionModule,
    TranslateModule,
    StoreModule
  ],
  declarations: [LeafRegisterVanillaComponent],
  exports: [LeafRegisterVanillaComponent]
})
export class LeafRegisterVanillaModule { }
