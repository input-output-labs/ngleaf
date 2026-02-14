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
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrganizationsApiClientModule } from '../../../api/clients/organizations-api-client/organizations-api-client.module';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    /* Leaf deps */
    LeafOrganizationStoreModule,
    OrganizationsApiClientModule,
    /* Material deps */
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [OrganizationSelectorComponent],
  exports: [OrganizationSelectorComponent]
})
export class OrganizationSelectorModule { }
