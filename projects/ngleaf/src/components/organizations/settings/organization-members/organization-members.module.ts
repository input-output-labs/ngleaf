import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { OrganizationMembersComponent } from './organization-members.component';
import { OrganizationInvitationsModule } from '../organization-invitations';
import { LeafOrganizationStoreModule } from '../../../../store/core/organizations/index';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

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
    MatMenuModule,
    MatDividerModule,
    /* Leaf deps*/
    LeafOrganizationStoreModule,
    OrganizationInvitationsModule,
  ],
  declarations: [OrganizationMembersComponent],
  exports: [OrganizationMembersComponent]
})
export class OrganizationMembersModule { }
