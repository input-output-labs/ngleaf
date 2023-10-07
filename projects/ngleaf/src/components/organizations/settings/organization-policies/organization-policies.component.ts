import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { LeafOrganization, OrganizationRole } from '../../../../api';
import { selectCurrentOrganization } from '../../../../store';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-organization-policies',
  templateUrl: './organization-policies.component.html',
  styleUrls: ['./organization-policies.component.scss']
})
export class OrganizationPoliciesComponent {
  public organization$: Observable<LeafOrganization>;
  public role$: Observable<OrganizationRole>;
  public unmodifiedRole: string;
  public role: OrganizationRole;

  constructor(private store: Store, router: Router, activatedRoute: ActivatedRoute) {
    this.organization$ = this.store.pipe(
      select(selectCurrentOrganization),
      filter(organization => !!organization)
    );
    this.role$ = combineLatest([
      this.organization$,
      activatedRoute.paramMap
    ]).pipe(
      map(([organization, params]) => {
        const routeRole = params.get("role");
        const defaultRole = organization.policies.roles[0].name;
        const foundRole = organization.policies.roles.find(role => role.name === routeRole);
        if (!routeRole) {
          router.navigate(['.', defaultRole], {relativeTo: activatedRoute});
        } else if (!foundRole) {
          router.navigate(['..', defaultRole], {relativeTo: activatedRoute});
        }
        return foundRole;
      })
    );
    this.role$.subscribe((role) => {
      this.role = JSON.parse(JSON.stringify(role));
      this.role.rights.sort((a, b) => a.order - b.order);
      this.unmodifiedRole = JSON.stringify(this.role);
    })
  }

  public isRoleEdited() {
    return this.unmodifiedRole !== JSON.stringify(this.role);
  }

  public createRole() {
    console.log("Should create a new role");
  }
}
