import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafLoginVanillaComponent } from './leaf-login-vanilla.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LeafSessionModule } from '../../../services/index';
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
  declarations: [LeafLoginVanillaComponent],
  exports: [LeafLoginVanillaComponent]
})
export class LeafLoginVanillaModule { }
