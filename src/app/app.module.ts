import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRouteModule } from './app.route';

import { environment } from '../environments/environment';

import { AccountSettingsPageModule } from '@iolabs/ngleaf';

import {
  TodoListModule,
  TableModule,
  NavigationModule,
  AddressFormModule,
  TreeModule
} from '@iolabs/ngleaf';

import { LeafConfigServiceModule } from '@iolabs/ngleaf';
import { LeafConfig } from '@iolabs/ngleaf';
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
    AccountSettingsPageModule, TodoListModule, TreeModule, TableModule, NavigationModule, AddressFormModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
