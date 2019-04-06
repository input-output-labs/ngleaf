import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule, MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

import { NavigationComponent } from './navigation.component';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  imports: [CommonModule, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule],
  declarations: [NavigationComponent],
  exports: [NavigationComponent]
})
export class NavigationModule {
}
