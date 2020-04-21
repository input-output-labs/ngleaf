import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRouteModule } from './app.route';

import { environment } from '../environments/environment';
import {
  LeafConfig,
  NgleafModule,
  LeafConfigServiceModule,
  LeafSessionService,
  LeafNotificationService,
  LeafAdminService,
  LeafUploadFileService,
  LeafAuthHttpClient,
  applicationHttpClientCreator,
  LeafAdminGuardService,
  LeafAuthGuardService
} from '@iolabs/ngleaf';
import { TemplatesComponent } from './templates/templates.component';
import { MatDividerModule } from '@angular/material';
import { HttpClient } from '@angular/common/http';

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
  imports: [BrowserModule, BrowserAnimationsModule,
    AppRouteModule,
    MatDividerModule,
    /* Leaf library import */
    LeafConfigServiceModule.forRoot(leafConfig),
    NgleafModule
  ],
  providers: [
    LeafAdminGuardService,
    LeafAuthGuardService,
    LeafNotificationService,
    LeafSessionService,
    LeafAdminService,
    LeafUploadFileService,
    {
      provide: LeafAuthHttpClient,
      useFactory: applicationHttpClientCreator,
      deps: [HttpClient],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(leafSession: LeafSessionService) {
    leafSession.init();
  }
}
