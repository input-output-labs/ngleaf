import { Inject, Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take, mergeMap, filter, map, withLatestFrom, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { selectCurrentAccount, selectInitializationOngoing, } from '../../store/core/session/session.selectors';
import { LeafConfigServiceToken } from '../../services/leaf-config.module';
import { LeafConfig } from '../../models/leaf-config.model';
import { LeafRedirection, RedirectionApiClientService } from '../../api/index';

@Injectable()
export class LeafRedirectionsGuardService  {

  constructor(
    private redirectionApiClient: RedirectionApiClientService,
    private store: Store,
    public router: Router,
    @Inject(LeafConfigServiceToken) public config: LeafConfig,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const redirectionHexId = route.paramMap.get('redirectionHexId');
    return this.redirectionApiClient.findById(redirectionHexId, true).pipe(
      map((redirection: LeafRedirection) => {
        if (redirection?.redirectUrl) {
          location.replace(redirection.redirectUrl);
          return false;
        } else {
          return true;
        }
      }),
      catchError(() => of(true))
    );
  }
}
