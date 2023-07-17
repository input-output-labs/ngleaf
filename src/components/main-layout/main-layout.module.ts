import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MenuModule } from '../menu/menu.module';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    RouterModule,
    /* Material deps*/
    MatSidenavModule,
    /* App deps */
    MenuModule
  ],
  declarations: [MainLayoutComponent]
})
export class MainLayoutModule { }
