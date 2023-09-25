import { Inject, Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take, mergeMap, filter, map, withLatestFrom } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { selectCurrentAccount, selectIsPending } from '../../store/core/session/session.selectors';
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
      select(selectIsPending),
      filter(isPending => !isPending),
      take(1),
      withLatestFrom(this.store.select(selectCurrentAccount)),
      map(([_pending, currentAccount]) => currentAccount.data),
      mergeMap(currentAccount => {
        if (currentAccount) {
          return of(true);
        } else {
          console.log('state: ', state);
          this.router.navigate([this.config.navigation.authGuardErrorRedirect || '/login'], {
            queryParams: {
              return: state.url
            }
          });
          return of(false);
        }
      })
    );
  }
}
