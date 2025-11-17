import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { OrganizationMembersComponent } from './organization-members.component';
import { OrganizationInvitationsModule } from '../organization-invitations';
import { OrganizationCandidaturesComponent } from '../organization-candidatures';
import { LeafOrganizationStoreModule } from '../../../../store/core/organizations/index';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LeafConfirmDialogModule } from '../../../../components/common/confirm-dialog/confirm-dialog.module';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  imports: [
    /* Core deps*/
    CommonModule,
    FormsModule,
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
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatBadgeModule,
    /* Leaf deps*/
    LeafOrganizationStoreModule,
    OrganizationInvitationsModule,
    LeafConfirmDialogModule,
  ],
  declarations: [OrganizationMembersComponent, OrganizationCandidaturesComponent],
  exports: [OrganizationMembersComponent]
})
export class OrganizationMembersModule { }
