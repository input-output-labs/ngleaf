import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { AdminSettingsAdministratorsComponent } from './admin-settings-administrators.component';
import { LeafAdminModule } from '../../../../services/index';
import { UserSelectorModule } from '../../user-selector/index';

@NgModule({
  declarations: [AdminSettingsAdministratorsComponent],
  imports: [
    /* Code deps */
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /* Material deps */
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    /* Leaf deps*/
    LeafAdminModule,
    UserSelectorModule
  ],
  exports: [AdminSettingsAdministratorsComponent]
})
export class AdminSettingsAdministratorsModule { }
