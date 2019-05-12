import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule, MatInputModule, MatListModule, MatButtonModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { AdminSettingsPageComponent } from './admin-settings-page.component';
import { AppSettingsPageRouteModule } from './admin-settings-page.route';

import { LeafComponentsCommonModule } from '../../common';
import { LeafServiceModule } from '../../../services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminSettingsAdministratorsComponent } from './admin-settings-administrators/admin-settings-administrators.component';
import { AdminSettingsWhitelistComponent } from './admin-settings-whitelist/admin-settings-whitelist.component';

@NgModule({
  declarations: [
    AdminSettingsPageComponent,
    AdminSettingsAdministratorsComponent,
    AdminSettingsWhitelistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    /* Material Imports */
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    /* Leaf Imports */
    LeafComponentsCommonModule,
    LeafServiceModule,
    AppSettingsPageRouteModule,
  ],
  exports: [
    AdminSettingsPageComponent,
    AdminSettingsAdministratorsComponent,
    AdminSettingsWhitelistComponent,
    LeafComponentsCommonModule
  ],
})
export class AdminSettingsPageModule {}
