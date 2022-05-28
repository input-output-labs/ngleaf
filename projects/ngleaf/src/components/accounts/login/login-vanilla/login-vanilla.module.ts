import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';

import { LeafSessionModule } from '../../../../services/index';
import { LeafLoginVanillaComponent } from './login-vanilla.component';

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
