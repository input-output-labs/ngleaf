import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationMembersComponent } from './organization-members.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { LeafOrganizationStoreModule } from '../../../../store/core/organizations/index';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { OrganizationInvitationsModule } from '../organization-invitations';

@NgModule({
  imports: [
    /* Core deps*/
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    /* Material deps*/
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatDialogModule,
    /* Leaf deps*/
    LeafOrganizationStoreModule,
    OrganizationInvitationsModule,
  ],
  declarations: [OrganizationMembersComponent],
  exports: [OrganizationMembersComponent]
})
export class OrganizationMembersModule { }
