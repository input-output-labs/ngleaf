import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {AccountSettingsPageModule} from '../../projects/ngleaf/src/lib/components/pages';
import {AppRouteModule} from './app.route';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRouteModule,
    AccountSettingsPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
