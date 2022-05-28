import { NgModule } from '@angular/core';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  LeafApiClientConfig,
  LeafApiClientConfigServiceModule,
  LeafConfig,
  LeafConfigServiceModule,
  leafCoreStore,
} from '@input-output-labs/ngleaf';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import { AppRouteModule } from '../app/app.route';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const leafConfig: LeafConfig = {
  serverUrl: '',
  navigation: {
    authGuardErrorRedirect: '/login',
    adminGuardErrorRedirect: '/forbidden',
    loginSuccessRedirect: '',
    registerSuccessRedirect: ''
  },
  apis: {
    pixabay_api_key: ''
  }
};

const leafApiClientConfig: LeafApiClientConfig = { serverUrl: '' };

@NgModule({
  imports: [
    /* Code deps */
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    /* Translation module */
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    /* Store deps */
    StoreModule.forRoot(
      {
        ...leafCoreStore
      }
    ),
    /* Material deps */
    /* Leaf deps*/
    LeafApiClientConfigServiceModule.forRoot(leafApiClientConfig),
    LeafConfigServiceModule.forRoot(leafConfig),
    AppRouteModule,
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
})
export class LeafStorybookAppModule { }
