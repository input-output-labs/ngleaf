import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationSelectorComponent } from './organization-selector.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LeafOrganizationStoreModule } from '../../../store/core/organizations/organizations-store.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    TranslateModule,
    /* Leaf deps */
    LeafOrganizationStoreModule,
    /* Material deps */
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatCardModule,
  ],
  declarations: [OrganizationSelectorComponent],
  exports: [OrganizationSelectorComponent]
})
export class OrganizationSelectorModule { }
