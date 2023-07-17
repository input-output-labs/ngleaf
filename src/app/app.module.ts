import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Inject, Injectable, LOCALE_ID, NgModule, isDevMode } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRouteModule } from './app.route';

import { environment } from '../environments/environment';
import {
  LeafConfig,
  LeafAdminModule,
  LeafConfigServiceModule,
  LeafWebSocketModule,
  LeafWebSocketService,
  LeafSessionModule,
  LeafSessionService,
  LeafUploadFileModule,
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
  messengerReducer,
  sponsoringReducer,
  MessengerEffects,
  NotificationsEffects,
  EmailingEffects,
  SponsoringEffects,
  NotificationApiClientModule,
  NotificationsWidgetModule,
} from '@input-output-labs/ngleaf';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonModule, getLocaleFirstDayOfWeek } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { EffectsModule } from '@ngrx/effects';
import { DateAdapter, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { Platform } from '@angular/cdk/platform';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';

const leafConfig: LeafConfig = {
  serverUrl: environment.serverUrl,
  serverWSBrokerUrl: environment.serverWSBrokerUrl,
  navigation: {
    authGuardErrorRedirect: '/welcome/login',
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

@Injectable()
export class LocaleDateAdapter extends NativeDateAdapter {
  constructor(@Inject(LOCALE_ID) public locale: string) {
    super(locale, new Platform(0));
  }

  getFirstDayOfWeek() {
    return getLocaleFirstDayOfWeek(this.locale);
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRouteModule,
    FormsModule,
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
    MatNativeDateModule,
    /* Leaf library import */
    LeafConfigServiceModule.forRoot(leafConfig),
    LeafApiClientConfigServiceModule.forRoot(leafApiClientConfig),
    // Stores
    EffectsModule.forRoot([SessionEffects, StatisticsEffects, NotificationsEffects, MessengerEffects, EmailingEffects, SponsoringEffects]),
    StoreModule.forRoot(
      {
        ...leafCoreStore,
        messenger: messengerReducer,
        sponsoring: sponsoringReducer
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    // Services
    LeafAdminModule,
    LeafWebSocketModule,
    LeafSessionModule,
    LeafUploadFileModule,
    NotificationApiClientModule,
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
    NotificationsWidgetModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [{
    provide: DateAdapter,
    useClass: LocaleDateAdapter
   },
   {provide: Window, useValue: window}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(leafSession: LeafSessionService, leafWebSocketService: LeafWebSocketService, translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');

    leafSession.init();
    leafWebSocketService.init();
  }
}
