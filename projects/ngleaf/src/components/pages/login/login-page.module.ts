import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule, MatCardModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginPageComponent } from './login-page.component';

import { LeafComponentsCommonModule } from '../../common';
import { LeafServiceModule } from '../../../services';

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
    LeafServiceModule,
  ],
  exports: [
    LoginPageComponent,
    LeafComponentsCommonModule
  ],
})
export class LoginPageModule {}
