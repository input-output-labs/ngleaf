import { Inject, Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { selectCurrentAccount } from '../../store/core/session/session.selectors';
import { LeafConfigServiceToken } from '../../services/leaf-config.module';
import { LeafConfig } from '../../models/leaf-config.model';

@Injectable()
export class LeafAuthGuardService implements CanActivate {

  constructor(
    private store: Store,
    public router: Router,
    @Inject(LeafConfigServiceToken) public config: LeafConfig,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectCurrentAccount).pipe(
      take(1),
      mergeMap(account => {
        if (account) {
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
