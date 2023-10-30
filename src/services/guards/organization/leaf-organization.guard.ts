import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LeafConfig, LeafConfigServiceToken, LeafCommonEligibilityGuard } from '@input-output-labs/ngleaf';

@Injectable()
export class LeafOrganizationGuardService extends LeafCommonEligibilityGuard {

  constructor(
    @Inject(LeafConfigServiceToken) config: LeafConfig,
    store: Store,
    router: Router,
  ) {
    super(store, router, 'seeOrganization', config.navigation.authGuardErrorRedirect || '/login');
  }
}
