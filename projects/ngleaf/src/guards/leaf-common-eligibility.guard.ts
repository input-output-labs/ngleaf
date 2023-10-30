import { Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { take, mergeMap, filter, map } from 'rxjs/operators';
import { selectInitializationOngoing } from '../store/core/session/session.selectors';
import { selectAsyncEligibilities } from '../store';
import { AsyncType } from '../store';
import { LeafEligibilities } from '../api/models/leaf-eligilibities';

export class LeafCommonEligibilityGuard  {
  constructor(
    private store: Store,
    private router: Router,
    private eligibilityKey: string,
    private fallbackUrl: (string | ((eligibilities: LeafEligibilities) => string))
  ){}

  canActivate(state: RouterStateSnapshot): Observable<boolean> {
    return combineLatest([
      this.store.pipe(
        select(selectInitializationOngoing),
        filter(initializationOngoing => !initializationOngoing),
        take(1)
      ),
      this.store.pipe(
        select(selectAsyncEligibilities),
        filter((asyncEligibilities: AsyncType<LeafEligibilities>) => !asyncEligibilities.status.pending),
        take(1)
      )
    ]).pipe(
      map(([_pending, asyncEligibilities]) => asyncEligibilities.data),
      mergeMap(eligibilities => {
        if (eligibilities && eligibilities[this.eligibilityKey].eligible) {
          return of(true);
        } else {
          const fallbackUrl = typeof this.fallbackUrl === 'function' ? this.fallbackUrl(eligibilities) : this.fallbackUrl;
          this.router.navigate([fallbackUrl], {
            queryParams: {
              return: state.url
            }
          });
          return of(false);
        }
      }),
    )
  }
}
