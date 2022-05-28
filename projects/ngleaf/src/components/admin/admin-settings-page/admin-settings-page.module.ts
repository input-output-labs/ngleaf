import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminSettingsPageComponent } from './admin-settings-page.component';
import { LeafAdminModule } from '../../../services/index';
import { AdminSettingsWhitelistModule } from './admin-settings-whitelist/admin-settings-whitelist.module';
import { AdminSettingsAdministratorsModule } from './admin-settings-administrators';
import { AdminSettingsUsersModule } from './admin-settings-users';

@NgModule({
  declarations: [AdminSettingsPageComponent],
  imports: [
    /* Code deps */
    CommonModule,
    RouterModule,
    /* Material deps */
    /* Leaf deps*/
    LeafAdminModule,
    AdminSettingsWhitelistModule,
    AdminSettingsAdministratorsModule,
    AdminSettingsUsersModule,
  ],
  exports: [AdminSettingsPageComponent]
})
export class AdminSettingsPageModule { }
