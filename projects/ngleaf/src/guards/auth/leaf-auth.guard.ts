import { Inject, Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take, mergeMap, filter, map, withLatestFrom, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { selectCurrentAccount, selectInitializationOngoing, } from '../../store/core/session/session.selectors';
import { LeafConfigServiceToken } from '../../services/leaf-config.module';
import { LeafConfig } from '../../models/leaf-config.model';

@Injectable()
export class LeafAuthGuardService  {

  constructor(
    private store: Store,
    public router: Router,
    @Inject(LeafConfigServiceToken) public config: LeafConfig,
  ) {}

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(selectInitializationOngoing),
      filter((initializationOngoing) => !initializationOngoing),
      withLatestFrom(this.store.select(selectCurrentAccount)),
      filter(([_pending, currentAccount]) => !currentAccount.status.pending),
      take(1),
      map(([_pending, currentAccount]) => currentAccount.data),
      mergeMap((currentAccount) => {
        if (currentAccount) {
          return of(true);
        } else {
          this.router.navigate(
            [this.config.navigation.authGuardErrorRedirect || "/login"],
            {
              queryParams: {
                return: state.url,
              },
            }
          );
          return of(false);
        }
      })
    );
  }
}
