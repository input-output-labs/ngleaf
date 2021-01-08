import { Inject, Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { LeafConfigServiceToken, LeafSessionService } from '../../services/index';
import { LeafConfig } from '../../models/leaf-config.model';
import { selectCurrentAccount } from '../../store/core/session/session.selectors';

@Injectable()
export class LeafAdminGuardService implements CanActivate {

  constructor(
    private store: Store,
    public sessionService: LeafSessionService,
    public router: Router,
    @Inject(LeafConfigServiceToken) public config: LeafConfig,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectCurrentAccount).pipe(
      take(1),
      mergeMap(account => {
        if (!!account && account.admin) {
          return of(true);
        } else {
          this.router.navigate([this.sessionService.config.navigation.adminGuardErrorRedirect || ''], {
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
