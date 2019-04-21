import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountSettingsPageModule } from './account-settings/account-settings-page.module';
import { AdminSettingsPageModule } from './admin-settings/admin-settings-page.module';

@NgModule({
  imports: [CommonModule, AccountSettingsPageModule, AdminSettingsPageModule],
})
export class LeafComponentsPagesModule {}
