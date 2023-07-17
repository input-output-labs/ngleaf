import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { LeafSessionModule, OrganizationSelectorModule } from '@input-output-labs/ngleaf';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    RouterModule,
    TranslateModule,
    /* Material deps */
    MatListModule,
    MatButtonModule,
    MatIconModule,
    /* Leaf deps */
    LeafSessionModule,
    OrganizationSelectorModule,
  ],
  declarations: [MenuComponent],
  exports: [MenuComponent]
})
export class MenuModule { }
