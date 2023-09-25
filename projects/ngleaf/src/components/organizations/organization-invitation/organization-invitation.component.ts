import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LeafAccountModel, LeafOrganization, OrganizationInvitationData, OrganizationsApiClientService } from '../../../api';
import { Observable, filter, map, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getInvitationData, listMyOrganizations, selectCurrentOrganization, selectInvitationData, selectMyOrganizationsData, setCurrentOrganizationId } from '../../../store/core/organizations';
import { selectCurrentAccountData } from '../../../store';
import { LeafConfig } from '../../../models/index';
import { LeafConfigServiceToken } from '../../../services/leaf-config.module';
import { Router } from '@angular/router';

@Component({
  selector: 'leaf-organization-invitation',
  templateUrl: './organization-invitation.component.html',
  styleUrls: ['./organization-invitation.component.scss']
})
export class OrganizationInvitationComponent implements OnInit {
  @Input()
  public organizationId: string;
  @Input()
  public email: string;

  public invitationData$: Observable<OrganizationInvitationData>;
  public invitationDataCallOngoing$: Observable<boolean>;

  constructor(
    private organizationsApiClientService: OrganizationsApiClientService,
    private store: Store,
    private router: Router,
    @Inject(LeafConfigServiceToken) public config: LeafConfig,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getInvitationData({id: this.organizationId, email: this.email}));
    const invitationData$ = this.store.select(selectInvitationData);
    this.invitationDataCallOngoing$ = invitationData$.pipe(
      map(iD => iD.status.pending)
    );
    this.invitationData$ = invitationData$.pipe(
      filter(iD => iD.status.success),
      map(iD => iD.data)
    );
  }

  public accept() {
    this.organizationsApiClientService.acceptInvitation(this.organizationId, this.email).pipe(
      take(1)
    ).subscribe(() =>
      this.router.navigate([this.config.navigation.afterInvitationRedirect || '/'])
    );
  }

  public decline() {
    this.organizationsApiClientService.acceptInvitation(this.organizationId, this.email).pipe(
      take(1)
    ).subscribe(() =>
      this.router.navigate([this.config.navigation.afterInvitationRedirect || '/'])
    );
  }
}
