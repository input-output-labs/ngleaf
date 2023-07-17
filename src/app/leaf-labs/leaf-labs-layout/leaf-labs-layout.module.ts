import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafLabsLayoutComponent } from './leaf-labs-layout.component';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    RouterModule,
    TranslateModule,
    /* Material deps */
    MatTabsModule
  ],
  declarations: [LeafLabsLayoutComponent],
  exports: [LeafLabsLayoutComponent]
})
export class LeafLabsLayoutModule { }
