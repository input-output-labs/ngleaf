import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, Subscription, combineLatest, debounce, interval, filter, map, startWith } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { LeafAccountModel, LeafOrganization, OrganizationMembership, LeafAccountProfile, LeafEligibilities } from '../../../../api';
import { selectCurrentAccountData, listOrganizationUsers, selectCurrentOrganization, removeUserFromOrganization, setUserRole, selectEligibilities } from '../../../../store';
import { MatDialog } from '@angular/material/dialog';
import { OrganizationInvitationsComponent } from '../organization-invitations';
import { OrganizationCandidaturesComponent } from '../organization-candidatures';

@Component({
  standalone: false,
  selector: 'leaf-organization-members',
  templateUrl: './organization-members.component.html',
  styleUrls: ['./organization-members.component.scss']
})
export class OrganizationMembersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['picture', 'name', 'role', 'actions'];

  public eligibilities$: Observable<LeafEligibilities>;
  public currentAccount$: Observable<LeafAccountModel>;
  public organization$: Observable<LeafOrganization>;
  public filteredMembers$: Observable<OrganizationMembership[]>;

  public searchFormControl: FormControl;

  private subscriptions: Subscription[] = [];

  constructor(fb: FormBuilder, private store: Store, private dialog: MatDialog) {
    this.currentAccount$ = this.store.select(selectCurrentAccountData);
    this.eligibilities$ = this.store.select(selectEligibilities);
    this.searchFormControl = fb.control('');
    this.organization$ = this.store.pipe(
      select(selectCurrentOrganization),
      filter(organization => !!organization)
    );
    this.filteredMembers$ = combineLatest([
      this.organization$,
      this.searchFormControl.valueChanges.pipe(startWith(this.searchFormControl.value))
    ]).pipe(
      map(([organization, searchValue]) => {
        return (organization.members || []).filter((member) => {
          if (!member.user || !member.user.profile) {
            return true;
          }
          if((member.user.profile.lastname || '').toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
          }
          if((member.user.profile.firstname || '').toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
          }
          if((member.user.profile.username || '').toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
          }
          return false;
        })
      })
    );
    this.subscriptions.push(
      this.organization$.pipe(
        filter(organization => organization.members.every((member) => !member.user)),
        debounce((i: any) => interval(i * 2500)),
      ).subscribe((organization) => {
        this.store.dispatch(listOrganizationUsers({organizationId: organization.id}));
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit() {}
  public getProfileShortname(profile: LeafAccountProfile) {
    if (profile.firstname && profile.lastname) {
      return profile.firstname.substring(0,1) + profile.lastname.substring(0,1);
    } else if (profile.firstname) {
      return profile.firstname.substring(0,2);
    }  else if (profile.lastname) {
      return profile.lastname.substring(0,2);
    } else if (profile.username) {
      return profile.username.substring(0,2);
    }
  }

  public openInvationDialog() {
    this.dialog.open(OrganizationInvitationsComponent);
  }

  public openCandidatureDialog() {
    this.dialog.open(OrganizationCandidaturesComponent, {
      width: '600px',
      maxWidth: '90vw',
      maxHeight: '80vh'
    });
  }

  public setUserRole(accountId: string, role: string) {
    this.store.dispatch(setUserRole({
      accountId,
      role
    }));
  }

  public removeUserFromOrganization(accountId: string) {
    this.store.dispatch(removeUserFromOrganization({accountId: accountId}));
  }

  public stopPropagation(event) {
    event.stopPropagation();
  }
}
