import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LeafConfigServiceToken } from '../../services/index';
import { LeafConfig } from '../../models/leaf-config.model';
import { LeafCommonEligibilityGuard } from '../leaf-common-eligibility.guard';

@Injectable()
export class LeafAdminGuardService extends LeafCommonEligibilityGuard {

  constructor(
    @Inject(LeafConfigServiceToken) config: LeafConfig,
    store: Store,
    router: Router,
  ) {
    super(config, store, router, 'seeAdmin');
  }
}
