import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRouteModule } from './app.route';

import { AccountSettingsPageModule } from '../../projects/ngleaf/src/lib/components/pages';
import {
  TodoListModule,
  TableModule,
  NavigationModule,
  AddressFormModule,
  TreeModule
} from '../../projects/ngleaf/src/lib/components/templates';
import { LeafConfigModule } from '../../projects/ngleaf/src/lib/services/leaf-config.module';
import { LeafConfig } from '../../projects/ngleaf/src/lib/models/leaf-config.model';

const leafConfig: LeafConfig = {
  serverUrl: 'https://io-labs.fr/escape/api/'
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule,
    AppRouteModule,
    /* Leaf library import */
    LeafConfigModule.forRoot(leafConfig),
    AccountSettingsPageModule, TodoListModule, TreeModule, TableModule, NavigationModule, AddressFormModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
