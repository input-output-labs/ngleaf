import { Component, Input, OnInit } from '@angular/core';
import { LeafAccountModel, LeafOrganization } from '../../../api';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { listMyOrganizations, selectCurrentOrganization, selectMyOrganizationsData, setCurrentOrganizationId } from '../../../store/core/organizations';
import { selectCurrentAccountData } from '../../../store';

@Component({
  selector: 'leaf-organization-selector',
  templateUrl: './organization-selector.component.html',
  styleUrls: ['./organization-selector.component.scss']
})
export class OrganizationSelectorComponent implements OnInit {
  @Input()
  public hideWhenNotLoggedIn: boolean = false;
  public currentAccount$: Observable<LeafAccountModel>;
  public organizations$: Observable<LeafOrganization[]>;
  public currentOrganization$: Observable<LeafOrganization>;

  constructor(private store: Store) {
    this.organizations$ = this.store.pipe(
      select(selectMyOrganizationsData)
    );
    this.currentOrganization$ = this.store.pipe(
      select(selectCurrentOrganization)
    );
    this.currentAccount$ = this.store.select(selectCurrentAccountData);
  }

  ngOnInit(): void {
    this.store.dispatch(listMyOrganizations());
  }

  public selectOrganization(organization) {
    this.store.dispatch(setCurrentOrganizationId({selectedOrganizationId: organization.id}));
  }

}
