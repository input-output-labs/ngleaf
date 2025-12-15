import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LeafRegisterComponent } from './register.component';
import { LeafSessionModule } from '../../../../services/index';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LeafPasswordSecurityModule } from '../../../common/password-security';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LeafSessionModule,
    TranslateModule,
    StoreModule,
    /* Material deps */
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    /* Leaf deps */
    LeafPasswordSecurityModule,
  ],
  declarations: [LeafRegisterComponent],
  exports: [LeafRegisterComponent]
})
export class LeafRegisterModule { }
