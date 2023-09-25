import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationInvitationsComponent } from './organization-invitations.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LeafOrganizationStoreModule } from '../../../../store/core/organizations/organizations-store.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrganizationSelectorModule } from '../../organization-selector';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    /* Material deps */
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatChipsModule,
    /* Leaf deps */
    LeafOrganizationStoreModule,
    OrganizationSelectorModule,
  ],
  declarations: [OrganizationInvitationsComponent],
  exports: [OrganizationInvitationsComponent]
})
export class OrganizationInvitationsModule { }
