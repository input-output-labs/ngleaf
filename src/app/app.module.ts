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
  LeafUploadFileModule
} from '@input-output-labs/ngleaf';
import { TemplatesComponent } from './templates/templates.component';
import { MatDividerModule } from '@angular/material/divider';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(leafSession: LeafSessionService) {
    leafSession.init();
  }
}
