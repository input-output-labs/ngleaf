import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountSettingsPageModule } from './account-settings/account-settings-page.module';

@NgModule({
  imports: [CommonModule, AccountSettingsPageModule],
})
export class LeafComponentsPagesModule {}
