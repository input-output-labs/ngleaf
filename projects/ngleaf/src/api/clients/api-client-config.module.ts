import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';

export interface LeafApiClientConfig {
  serverUrl: string;
}

// Injection token
export const LeafApiClientConfigServiceToken = new InjectionToken<LeafApiClientConfig>('LEAF_API_CLIENT_CONFIG');

@NgModule()
export class LeafApiClientConfigServiceModule {
  static forRoot(config: LeafApiClientConfig): ModuleWithProviders<LeafApiClientConfigServiceModule> {
    return {
      ngModule: LeafApiClientConfigServiceModule,
      providers: [
        {
          provide: LeafApiClientConfigServiceToken,
          useValue: config
        }
      ]
    };
  }
}
