import { Inject, Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take, mergeMap, filter, map, withLatestFrom } from 'rxjs/operators';
import { Observable, tap, of } from 'rxjs';
import { selectInitializationOngoing, } from '../../store/core/session/session.selectors';
import { LeafConfigServiceToken } from '../../services/leaf-config.module';
import { LeafConfig } from '../../models/leaf-config.model';
import { selectCurrentOrganization, selectMyOrganizations } from '../../store';

@Injectable()
export class LeafOrganizationSelectedGuardService  {

  constructor(
    private store: Store,
    public router: Router,
    @Inject(LeafConfigServiceToken) public config: LeafConfig,
  ) {}

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(selectInitializationOngoing),
      filter(initializationOngoing => !initializationOngoing),
      take(1),
      mergeMap(() => {
        return this.store.pipe(
          select(selectMyOrganizations),
          filter((asyncItem) => !asyncItem.status.pending),
          map((asyncItem) => asyncItem.data),
          withLatestFrom(this.store.select(selectCurrentOrganization)),
          mergeMap(([myOrganizations, selectedOrganization]) => {
            if (selectedOrganization) {
              return of(true);
            } else {
              const redirectUrl = myOrganizations.length
                ? this.config.navigation.organizationSelectedGuardErrorRedirectSelectionPossible
                : this.config.navigation.organizationSelectedGuardErrorRedirectNoSelectionPossible;
              this.router.navigate([redirectUrl || this.config.navigation.authGuardErrorRedirect || '//login'], {
                queryParams: {
                  return: state.url
                }
              });
              return of(false);
            }
          })
        );
      })
    );
  }
}
