import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { OdooApiClientModule } from '../../../api/clients/odoo-api-client/odoo-api-client.module';
import { OdooOpportunitySelectorComponent } from './odoo-opportunity-selector.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    OdooApiClientModule,
  ],
  declarations: [OdooOpportunitySelectorComponent],
  exports: [OdooOpportunitySelectorComponent],
})
export class OdooOpportunitySelectorModule {}
