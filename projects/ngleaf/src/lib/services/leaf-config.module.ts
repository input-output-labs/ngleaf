import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { LeafConfig } from '../models/leaf-config.model';

// Injection token
export const LeafConfigServiceToken = new InjectionToken<LeafConfig>('LEAF_CONFIG');

@NgModule()
export class LeafConfigModule {
  static forRoot(config: LeafConfig): ModuleWithProviders {
    return {
      ngModule: LeafConfigModule,
      providers: [
        {
          provide: LeafConfigServiceToken,
          useValue: config
        }
      ]
    };
  }
}
