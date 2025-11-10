import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LeafAccountModel, LeafOrganization } from '../../../api';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { listMyOrganizations, selectCurrentOrganization, selectMyOrganizationsData, setCurrentOrganizationId } from '../../../store/core/organizations';
import { selectCurrentAccountData } from '../../../store';
import { FormControl, FormGroup } from '@angular/forms';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

@Component({
  standalone: false,
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

  @Input()
  public fetchOnInit: boolean = false;

  @ViewChild('menuTrigger')
  public menuTrigger!: MatMenuTrigger;

  public currentAccount$: Observable<LeafAccountModel>;
  public organizations$: Observable<LeafOrganization[]>;
  public filteredOrganizations$: Observable<LeafOrganization[]>;
  public currentOrganization$: Observable<LeafOrganization>;
  public searchField: FormControl = new FormControl('');

  constructor(private store: Store) {
    this.organizations$ = this.store.pipe(
      select(selectMyOrganizationsData)
    );
    this.filteredOrganizations$ = combineLatest([
      this.organizations$,
      this.searchField.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([organizations, search]) => 
        organizations.filter(
          organization => organization.name.toLowerCase().includes(search.toLowerCase())
        ).sort((a, b) => a.name.localeCompare(b.name))
      )
    );
    this.currentOrganization$ = this.store.pipe(
      select(selectCurrentOrganization)
    );
    this.currentAccount$ = this.store.select(selectCurrentAccountData);
  }

  ngOnInit(): void {
    if (this.fetchOnInit) {
      this.store.dispatch(listMyOrganizations());
    }
  }

  public selectOrganization(organization) {
    this.store.dispatch(setCurrentOrganizationId({selectedOrganizationId: organization.id}));
    if (this.menuTrigger) {
      this.menuTrigger.closeMenu();
    }
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
