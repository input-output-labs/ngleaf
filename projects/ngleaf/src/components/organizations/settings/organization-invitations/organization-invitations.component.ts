import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { LeafAccountModel, LeafOrganization, OrganizationMembership, LeafAccountProfile, OrganizationInvitation } from '../../../../api';
import { selectCurrentAccountData, listOrganizationUsers, selectCurrentOrganization, inviteUserToOrganization, cancelInvitation } from '../../../../store';


@Component({
  selector: 'leaf-organization-invitations',
  templateUrl: './organization-invitations.component.html',
  styleUrls: ['./organization-invitations.component.scss']
})
export class OrganizationInvitationsComponent {
  displayedColumns: string[] = ['date', 'email', 'status'];

  public inviteEmailFormControl: FormControl;
  public organization$: Observable<LeafOrganization>;
  public filteredInvitation$: Observable<OrganizationInvitation[]>;
  public readonly invitationStatusToColorMapping = {
    INVITED: 'gray',
    ACCEPTED: 'primary',
    CANCELLED: 'gray',
    DECLINED: 'warn',
  };

  constructor(fb: FormBuilder, private store: Store) {
    this.inviteEmailFormControl = fb.control('', [Validators.required, Validators.email]);
    this.organization$ = this.store.pipe(
      select(selectCurrentOrganization),
      filter(organization => !!organization)
    );
    this.filteredInvitation$ = combineLatest([
      this.organization$
    ]).pipe(
      map(([organization]) => organization.invitations || [])
    )
  }

  public inviteUser(organizationId: string) {
    if (this.inviteEmailFormControl.valid) {
      const email = this.inviteEmailFormControl.value;
      this.store.dispatch(inviteUserToOrganization({id: organizationId, email}));
    }
  }

  public cancelInvitation(organization: LeafOrganization, invitation: OrganizationInvitation) {
    this.store.dispatch(cancelInvitation({id: organization.id, email: invitation.email}));
  }
}
