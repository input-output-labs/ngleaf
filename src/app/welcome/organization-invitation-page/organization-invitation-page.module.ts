import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationInvitationModule } from '@input-output-labs/ngleaf';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { OrganizationInvitationPageComponent } from './organization-invitation-page.component';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    RouterModule,
    TranslateModule,
    /* Material deps */
    MatDividerModule,
    /* Leaf deps */
    OrganizationInvitationModule,
  ],
  declarations: [OrganizationInvitationPageComponent],
  exports: [OrganizationInvitationPageComponent]
})
export class OrganizationInvitationPageModule { }
