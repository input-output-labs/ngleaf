import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { LeafConfig } from '../models/index';

// Injection token
export const LeafConfigServiceToken = new InjectionToken<LeafConfig>('LEAF_CONFIG');

@NgModule()
export class LeafConfigServiceModule {
  static forRoot(config: LeafConfig): ModuleWithProviders<LeafConfigServiceModule> {
    return {
      ngModule: LeafConfigServiceModule,
      providers: [
        {
          provide: LeafConfigServiceToken,
          useValue: config
        }
      ]
    };
  }
}
