import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule, MatCardModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { LoginPageComponent } from './login-page.component';

import { LeafComponentsCommonModule } from '../../common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    /* Material Imports */
    MatCardModule,
    MatDividerModule,
    /* Leaf Imports */
    LeafComponentsCommonModule,
  ],
  exports: [
    LoginPageComponent
  ],
})
export class LoginPageModule {}
