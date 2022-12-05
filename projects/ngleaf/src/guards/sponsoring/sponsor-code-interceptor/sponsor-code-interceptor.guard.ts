import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { setSponsorCode } from '../../../store/sponsoring/index';
import { Observable, of } from 'rxjs';

@Injectable()
export class LeafSponsorCodeInterceptorGuard implements CanActivate {

  constructor(
    private store: Store,
    public router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> {
    this.store.dispatch(
      setSponsorCode({
        sponsorCode: route.queryParams.sponsorCode
      })
    );
    return of(true);
  }
}
