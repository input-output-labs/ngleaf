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
  leafCoreStore
} from '@input-output-labs/ngleaf';
import { TemplatesComponent } from './templates/templates.component';
import { MatDividerModule } from '@angular/material/divider';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const leafConfig: LeafConfig = {
  serverUrl: environment.serverUrl,
  navigation: {
    authGuardErrorRedirect: '/login',
    adminGuardErrorRedirect: '/forbidden',
    loginSuccessRedirect: '',
    registerSuccessRedirect: ''
  }
};

@NgModule({
  declarations: [AppComponent, TemplatesComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouteModule,
    MatDividerModule,
    /* Leaf library import */
    LeafConfigServiceModule.forRoot(leafConfig),
    LeafComponentsModule,
    LeafAdminModule,
    LeafNotificationModule,
    LeafSessionModule,
    LeafUploadFileModule,
    StoreModule.forRoot(
      {
        ...leafCoreStore
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(leafSession: LeafSessionService) {
    leafSession.init();
  }
}
