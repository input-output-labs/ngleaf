import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRouteModule } from './app.route';

import { AccountSettingsPageModule, LeafComponentsCommonModule } from '@iolabs/ngleaf';
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
  serverUrl: 'https://io-labs.fr/escape/api/'
};

@NgModule({
  declarations: [AppComponent, TemplatesComponent],
  imports: [BrowserModule, BrowserAnimationsModule,
    AppRouteModule,
    MatDividerModule,
    /* Leaf library import */
    LeafConfigServiceModule.forRoot(leafConfig),
    LeafComponentsCommonModule,
    AccountSettingsPageModule, TodoListModule, TreeModule, TableModule, NavigationModule, AddressFormModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
