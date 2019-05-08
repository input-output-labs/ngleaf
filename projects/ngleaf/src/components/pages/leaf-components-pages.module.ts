import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountSettingsPageModule } from './account-settings/account-settings-page.module';
import { AdminSettingsPageModule } from './admin-settings/admin-settings-page.module';
import { LoginPageModule } from './login/login-page.module';

@NgModule({
  imports: [CommonModule, AccountSettingsPageModule, AdminSettingsPageModule, LoginPageModule],
})
export class LeafComponentsPagesModule {}
