import { Inject, Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { take, mergeMap, filter, map, withLatestFrom } from 'rxjs/operators';
import { LeafConfigServiceToken, LeafSessionService } from '../../services/index';
import { LeafConfig } from '../../models/leaf-config.model';
import { selectCurrentAccount, selectIsPending } from '../../store/core/session/session.selectors';

@Injectable()
export class LeafAdminGuardService implements CanActivate {

  constructor(
    private store: Store,
    public sessionService: LeafSessionService,
    public router: Router,
    @Inject(LeafConfigServiceToken) public config: LeafConfig,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(selectIsPending),
      filter(isPending => !isPending),
      take(1),
      withLatestFrom(this.store.select(selectCurrentAccount)),
      map(([_pending, currentAccount]) => currentAccount.data),
      mergeMap(currentAccount => {
        if (!!currentAccount && currentAccount.admin) {
          return of(true);
        } else {
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
