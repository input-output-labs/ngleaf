import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafLabsLayoutComponent } from './leaf-labs-layout.component';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from '../../../components/layout/layout.module';


@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    RouterModule,
    TranslateModule,
    LayoutModule,
    /* Material deps */
    MatTabsModule
  ],
  declarations: [LeafLabsLayoutComponent],
  exports: [LeafLabsLayoutComponent]
})
export class LeafLabsLayoutModule {}
