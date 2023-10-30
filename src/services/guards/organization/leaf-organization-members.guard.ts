import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LeafConfig, LeafConfigServiceToken, LeafCommonEligibilityGuard } from '@input-output-labs/ngleaf';

@Injectable()
export class LeafOrganizationMembersGuardService extends LeafCommonEligibilityGuard {

  constructor(
    @Inject(LeafConfigServiceToken) config: LeafConfig,
    store: Store,
    router: Router,
  ) {
    super(store, router, 'seeMembers', (eligibilities) => {
      if (eligibilities.seePolicies) {
        return '/organization/policies';
      } else {
        return config.navigation.authGuardErrorRedirect || '/login'
      }
    });
  }
}
