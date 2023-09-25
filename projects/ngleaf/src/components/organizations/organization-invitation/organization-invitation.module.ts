import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LeafOrganizationStoreModule } from '../../../store/core/organizations/organizations-store.module';
import { OrganizationsApiClientModule } from '../../../api/index';

import { OrganizationInvitationComponent } from './organization-invitation.component';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    TranslateModule,
    RouterModule,
    /* Leaf deps */
    LeafOrganizationStoreModule,
    OrganizationsApiClientModule,
    /* Material deps */
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  declarations: [OrganizationInvitationComponent],
  exports: [OrganizationInvitationComponent]
})
export class OrganizationInvitationModule { }
