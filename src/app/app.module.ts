import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRouteModule } from './app.route';

import { environment } from '../environments/environment';
import { LeafConfig, NgleafModule, LeafConfigServiceModule, LeafSessionService } from '@iolabs/ngleaf';
import { TemplatesComponent } from './templates/templates.component';
import { MatDividerModule } from '@angular/material';

const leafConfig: LeafConfig = {
  serverUrl: environment.serverUrl
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(leafSession: LeafSessionService) {
    leafSession.init();
  }
}
