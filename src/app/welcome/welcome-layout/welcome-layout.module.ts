import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeLayoutComponent } from './welcome-layout.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
  ],
  declarations: [WelcomeLayoutComponent]
})
export class WelcomeLayoutModule { }
