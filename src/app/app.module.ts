import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRouteModule } from './app.route';

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

const leafConfig: LeafConfig = {
  serverUrl: 'https://io-labs.fr/escape/api/'
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule,
    AppRouteModule,
    /* Leaf library import */
    LeafConfigServiceModule.forRoot(leafConfig),
    AccountSettingsPageModule, TodoListModule, TreeModule, TableModule, NavigationModule, AddressFormModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
