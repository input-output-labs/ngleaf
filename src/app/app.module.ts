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

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule,
    AppRouteModule,
    /* Leaf library import */
    AccountSettingsPageModule, TodoListModule, TreeModule, TableModule, NavigationModule, AddressFormModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
