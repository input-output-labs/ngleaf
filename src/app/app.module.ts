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
} from '@input-output-labs/ngleaf';
import { TemplatesComponent } from './templates/templates.component';
import { MatDividerModule } from '@angular/material/divider';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

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

@NgModule({
  declarations: [AppComponent, TemplatesComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRouteModule,
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
    LeafConfigServiceModule.forRoot(leafConfig),
    LeafComponentsModule,
    LeafAdminModule,
    LeafNotificationModule,
    LeafSessionModule,
    LeafWebImagesSeekerModule,
    LeafUploadFileModule,
    LeafLoginVanillaModule,
    LeafRegisterVanillaModule,
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
