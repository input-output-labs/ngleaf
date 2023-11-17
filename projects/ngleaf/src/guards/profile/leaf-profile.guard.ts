import { Inject, Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take, mergeMap, filter, map, withLatestFrom, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { selectCurrentAccount, selectInitializationOngoing, } from '../../store/core/session/session.selectors';
import { LeafConfigServiceToken } from '../../services/leaf-config.module';
import { LeafConfig } from '../../models/leaf-config.model';
import { LeafAccountModel } from '../../api';

@Injectable()
export class LeafProfileGuardService  {

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
      withLatestFrom(this.store.select(selectCurrentAccount)),
      map(([_pending, currentAccount]) => currentAccount.data),
      mergeMap(currentAccount => {
        if (currentAccount && this.profileFilled(currentAccount)) {
          return of(true);
        } else {
          this.router.navigate([this.config.navigation.profileGuardErrorRedirect || '/'], {
            queryParams: {
              return: state.url
            }
          });
          return of(false);
        }
      })
    );
  }

  private profileFilled(account: LeafAccountModel) {
    return !!(account.profile.firstname && account.profile.lastname && account.profile.address);
}
}
