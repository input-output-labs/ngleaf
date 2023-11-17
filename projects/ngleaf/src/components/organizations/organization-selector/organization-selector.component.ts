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

  @Input()
  public menuXPosition: string = "before";

  @Input()
  public menuYPosition: string = "above";

  @Input()
  public reduced: boolean = true;

  @Input()
  public design: 'widget' | 'cards' = 'widget';

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
  public getProfileShortname(organization: LeafOrganization) {
    const name = organization.name;
    const nameParts = name.trim().split(" ");
    if (nameParts.length >= 2) {
      return nameParts[0].charAt(0) + nameParts[1].charAt(0);
    } else if (nameParts.length === 1) {
      if (nameParts[0].length >= 2) {
        return nameParts[0].charAt(0) + nameParts[0].charAt(1);
      }
      return nameParts[0].charAt(0) + nameParts[0].charAt(0);
    } else {
      return "xx";
    }
  }

}
