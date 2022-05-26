import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRouteModule } from './app.route';

import { environment } from '../environments/environment';
import {
  LeafConfig,
  LeafAdminModule,
  LeafComponentsModule,
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
  SessionEffects,
  AdaptiveViewModule,
  StatisticsEffects,
  GenericFormModule,
} from '@input-output-labs/ngleaf';
import { TemplatesComponent } from './templates/templates.component';
import { MatDividerModule } from '@angular/material/divider';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
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
    FormsModule,
    MatButtonModule,
    MatCommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatDialogModule,
    /* Leaf library import */
    LeafApiClientConfigServiceModule.forRoot(leafApiClientConfig),
    EffectsModule.forRoot([SessionEffects, StatisticsEffects]),
    LeafConfigServiceModule.forRoot(leafConfig),
    LeafComponentsModule,
    LeafAdminModule,
    LeafNotificationModule,
    LeafSessionModule,
    LeafWebImagesSeekerModule,
    LeafUploadFileModule,
    LeafLoginVanillaModule,
    LeafRegisterVanillaModule,
    LeafPasswordForgottenVanillaModule,
    AdaptiveViewModule,
    GenericFormModule,
    StoreModule.forRoot(
      {
        ...leafCoreStore
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    })
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
