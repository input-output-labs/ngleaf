import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { OrganizationInvitationData } from '../../../api';
import { Observable, filter, map, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AsyncType } from '../../../store/common/async-type';
import { acceptInvitation, declineInvitation, getInvitationData, listMyOrganizations, selectInvitationAcceptationOrDecline, selectInvitationData, selectMyOrganizations, setCurrentOrganizationId } from '../../../store/core/organizations';
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

  @Output()
  public acceptationStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public declineStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  public invitationData$: Observable<OrganizationInvitationData>;
  public invitationDataCallOngoing$: Observable<boolean>;

  constructor(
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
    this.store.dispatch(acceptInvitation({
      organizationId: this.organizationId,
      email: this.email,
    }));

    this.store.pipe(
      select(selectInvitationAcceptationOrDecline),
      filter((asyncItem: AsyncType<void>) => !asyncItem.status.pending),
      take(1)
    ).subscribe((asyncItem) => {
      this.acceptationStatus.emit(asyncItem.status.success);
      if (asyncItem.status.success) {
        this.store.dispatch(listMyOrganizations());
        this.store.dispatch(setCurrentOrganizationId({selectedOrganizationId: this.organizationId}));

        this.store.pipe(
          select(selectMyOrganizations),
          filter((asyncItem: AsyncType<any>) => !asyncItem.status.pending),
          take(1)
        ).subscribe(() => {
          this.router.navigate([this.config.navigation.afterInvitationRedirect || '/']);
        });
      }
    });
  }

  public decline() {
    this.store.dispatch(declineInvitation({
      organizationId: this.organizationId,
      email: this.email,
    }));

    this.store.pipe(
      select(selectInvitationAcceptationOrDecline),
      filter((asyncItem: AsyncType<void>) => !asyncItem.status.pending),
      take(1)
    ).subscribe((asyncItem) => {
      this.declineStatus.emit(asyncItem.status.success);
      if (asyncItem.status.success) {
        this.router.navigate([this.config.navigation.afterInvitationRedirect || '/'])
      }
    });
  }

  public leave() {
    this.router.navigate([this.config.navigation.afterInvitationRedirect || '/']);
  }
}
