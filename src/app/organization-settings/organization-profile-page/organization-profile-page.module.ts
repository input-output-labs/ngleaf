import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationProfilePageComponent } from './organization-profile-page.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileUpdateModule } from '@input-output-labs/ngleaf';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    RouterModule,
    TranslateModule,
    /* Leaf deps */
    ProfileUpdateModule,
  ],
  declarations: [OrganizationProfilePageComponent],
  exports: [OrganizationProfilePageComponent]
})
export class OrganizationProfilePageModule { }
