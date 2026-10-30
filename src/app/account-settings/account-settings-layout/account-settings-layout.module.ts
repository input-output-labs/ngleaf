import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsLayoutComponent } from './account-settings-layout.component';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from '../../../components/layout/layout.module';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    RouterModule,
    TranslateModule,
    LayoutModule,
    /* Material deps */
    MatTabsModule
  ],
  declarations: [AccountSettingsLayoutComponent],
  exports: [AccountSettingsLayoutComponent]
})
export class AccountSettingsLayoutModule { }
