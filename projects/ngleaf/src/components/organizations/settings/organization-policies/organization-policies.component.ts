import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import {
  Observable,
  combineLatest,
  filter,
  map,
  Subscription,
  take,
  Subject,
} from "rxjs";
import { LeafEligibilities, LeafOrganization, OrganizationRole } from "../../../../api";
import {
  selectCurrentOrganization,
  createRole,
  selectCreateRole,
  AsyncType,
  deleteRole,
  selectDeleteRole,
  updateRole,
  selectUpdateRole,
  selectEligibilities,
} from "../../../../store";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";

@Component({
  selector: "app-organization-policies",
  templateUrl: "./organization-policies.component.html",
  styleUrls: ["./organization-policies.component.scss"],
})
export class OrganizationPoliciesComponent implements OnDestroy {
  public eligibilities$: Observable<LeafEligibilities>;
  public organization$: Observable<LeafOrganization>;
  public role$: Observable<OrganizationRole>;
  public unmodifiedRole: string;
  public role: OrganizationRole;
  public roleName: string;
  private subscriptions: Subscription[] = [];
  public routingCheckTrigger$: Subject<void> = new Subject<void>();
  public roleUpdated: boolean;
  public roleNameForm: FormControl;

  constructor(
    private store: Store,
    private translateService: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.eligibilities$ = this.store.select(selectEligibilities);
    this.roleNameForm = this.fb.control("", Validators.required);
    this.organization$ = this.store.pipe(
      select(selectCurrentOrganization),
      filter((organization) => !!organization)
    );

    const roleAnalysis$: Observable<[string, string, OrganizationRole | null]> =
      combineLatest([this.organization$, activatedRoute.paramMap]).pipe(
        map(([organization, params]) => {
          const routeRole = params.get("role");
          const defaultRole = organization.policies.roles[0].name;
          const foundRole = organization.policies.roles.find(
            (role) => role.name === routeRole
          );
          return [routeRole, defaultRole, foundRole];
        })
      );

    this.subscriptions.push(
      combineLatest([roleAnalysis$, this.routingCheckTrigger$])
        .pipe(map(([roleAnalysis]) => roleAnalysis))
        .subscribe(([routeRole, defaultRole, foundRole]) => {
          if (!routeRole) {
            router.navigate([".", defaultRole], {
              relativeTo: activatedRoute,
            });
          } else if (!foundRole) {
            router.navigate(["..", defaultRole], {
              relativeTo: activatedRoute,
            });
          }
        })
    );
    this.routingCheckTrigger$.next();

    this.role$ = roleAnalysis$.pipe(
      map(([_routeRole, _defaultRole, foundRole]) => {
        return foundRole;
      })
    );
    this.role$.subscribe((role) => {
      if (role) {
        this.role = JSON.parse(JSON.stringify(role));
        this.roleName = role.name;
        this.role.rights.sort((a, b) => a.order - b.order);
        this.roleNameForm.setValue(this.role.name);
        this.roleUpdated = false;
      }
    });

    this.roleNameForm.valueChanges.subscribe((nameChanged) =>
      this.onNameChange(nameChanged)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }

  public createRole() {
    this.translateService
      .get("leaf.organization-policies.defaultNewRoleName")
      .subscribe((defaultNewRoleName) => {
        this.store.dispatch(
          createRole({
            name: defaultNewRoleName,
          })
        );

        this.store
          .pipe(
            select(selectCreateRole),
            filter(
              (createRole: AsyncType<LeafOrganization>) =>
                !createRole.status.pending
            ),
            take(1)
          )
          .subscribe((createRole: AsyncType<LeafOrganization>) => {
            if (createRole.status.success) {
              this.router.navigate(["..", defaultNewRoleName], {
                relativeTo: this.activatedRoute,
              });
            } else if (createRole.status.failure) {
              // TODO: display error message
            }
          });
      });
  }

  public deleteRole() {
    this.store.dispatch(
      deleteRole({
        role: this.role,
      })
    );

    this.store
      .pipe(
        select(selectDeleteRole),
        filter(
          (deleteRole: AsyncType<LeafOrganization>) =>
            !deleteRole.status.pending
        ),
        take(1)
      )
      .subscribe((deleteRole: AsyncType<LeafOrganization>) => {
        if (deleteRole.status.success) {
          this.routingCheckTrigger$.next();
        } else if (deleteRole.status.failure) {
          // TODO: display error message
        }
      });
  }

  public updateRole() {
    this.store.dispatch(
      updateRole({
        roleName: this.roleName,
        role: this.role,
      })
    );

    this.store
      .pipe(
        select(selectUpdateRole),
        filter(
          (updateRole: AsyncType<LeafOrganization>) =>
            !updateRole.status.pending
        ),
        take(1)
      )
      .subscribe((updateRole: AsyncType<LeafOrganization>) => {
        if (updateRole.status.success) {
          this.router.navigate(["..", this.role.name], {
            relativeTo: this.activatedRoute,
          });
        } else if (updateRole.status.failure) {
          // TODO: display error message
        }
      });
  }

  public onNameChange(newName: string) {
    this.role.name = newName;
    this.roleUpdated = true;
  }

  public onRightValueChange(policyName: string, change: MatSlideToggleChange) {
    this.role.rights.forEach((right) => {
      if (right.name === policyName) {
        right.value = change.checked ? "true" : "false";
        this.roleUpdated = true;
      }
    });
  }

  public onNumberRightValueChange(policyName: string, newValue: string) {
    this.role.rights.forEach((right) => {
      if (right.name === policyName) {
        right.value = newValue;
        this.roleUpdated = true;
      }
    });
  }

  public addtoNumberRight(policyName: string, addition: number) {
    this.role.rights.forEach((right) => {
      if (right.name === policyName) {
        if (right.type === "number") {
          const currentValue = Number(right.value);
          if (!isNaN(currentValue)) {
            const newValue = currentValue + addition;
            right.value = `${newValue}`;
            this.roleUpdated = true;
          }
        }
      }
    });
  }
}
