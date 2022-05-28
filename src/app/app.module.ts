import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRouteModule } from './app.route';

import { environment } from '../environments/environment';
import {
  LeafConfig,
  LeafAdminModule,
  LeafConfigServiceModule,
  LeafNotificationModule,
  LeafSessionModule,
  LeafSessionService,
  LeafUploadFileModule,
  LeafWebImagesSeekerModule,
  leafCoreStore,
  LeafApiClientConfig,
  LeafApiClientConfigServiceModule,
  LeafLoginVanillaModule,
  LeafRegisterVanillaModule,
  LeafPasswordForgottenVanillaModule,
  LeafNavigationModule,
  SessionEffects,
  AdaptiveViewModule,
  StatisticsEffects,
  GenericFormModule,
  LeafHeaderAccountModule,
  AdminSettingsPageModule,
} from '@input-output-labs/ngleaf';
import { TemplatesComponent } from './templates/templates.component';
import { MatDividerModule } from '@angular/material/divider';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { EffectsModule } from '@ngrx/effects';

const leafConfig: LeafConfig = {
  serverUrl: environment.serverUrl,
  navigation: {
    authGuardErrorRedirect: '/login',
    adminGuardErrorRedirect: '/forbidden',
    loginSuccessRedirect: '',
    registerSuccessRedirect: ''
  },
  apis: {
    pixabay_api_key: environment.API_KEY_PIXABAY
  }
};

const leafApiClientConfig: LeafApiClientConfig = {
  serverUrl: environment.serverUrl
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent, TemplatesComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRouteModule,
    /* Translation module */
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    /* Material design library import */
    MatDividerModule,
    /* Leaf library import */
    // Stores
    LeafConfigServiceModule.forRoot(leafConfig),
    LeafApiClientConfigServiceModule.forRoot(leafApiClientConfig),
    EffectsModule.forRoot([SessionEffects, StatisticsEffects]),
    StoreModule.forRoot(
      {
        ...leafCoreStore
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    // Services
    LeafAdminModule,
    LeafNotificationModule,
    LeafSessionModule,
    LeafWebImagesSeekerModule,
    LeafUploadFileModule,
    // Directive
    AdaptiveViewModule,
    // Components
    LeafLoginVanillaModule,
    LeafRegisterVanillaModule,
    LeafPasswordForgottenVanillaModule,
    GenericFormModule,
    LeafNavigationModule,
    LeafHeaderAccountModule,
    AdminSettingsPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(leafSession: LeafSessionService, translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');

    leafSession.init();
  }
}
