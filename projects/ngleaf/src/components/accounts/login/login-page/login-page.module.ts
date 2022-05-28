import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { LeafLoginModule } from '../login/login.module';
import { LoginPageComponent } from './login-page.component';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    /* Code deps */
    CommonModule,
    /* Material deps */
    MatCardModule,
    MatDividerModule,
    /* Leaf deps*/
    LeafLoginModule,
  ],
  exports: [LoginPageComponent]
})
export class LeafLoginPageModule { }
