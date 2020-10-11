import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { take, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LeafSessionService } from '../../services/index';

@Injectable()
export class LeafAdminGuardService implements CanActivate {

  constructor(
    public sessionService: LeafSessionService,
    public router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.sessionService.currentAccount$.pipe(
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
