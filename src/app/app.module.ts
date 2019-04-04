import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {AccountSettingsPageModule} from '../../projects/ngleaf/src/lib/components/pages';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AccountSettingsPageModule,
    RouterModule.forRoot(
      [
        {path: '', component: AppComponent}
      ]
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
