import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { OrganizationPoliciesComponent } from './organization-policies.component';
import { LeafOrganizationStoreModule } from '../../../../store/core/organizations/index';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    TranslateModule,
    RouterModule,
    ReactiveFormsModule,
    /* Material deps */
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    /* Leaf deps */
    LeafOrganizationStoreModule,
  ],
  declarations: [OrganizationPoliciesComponent]
})
export class OrganizationPoliciesModule { }
