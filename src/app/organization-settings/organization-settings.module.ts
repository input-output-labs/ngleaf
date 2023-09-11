import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AvatarUpdateComponent, AvatarUpdateModule, PasswordUpdateComponent, PasswordUpdateModule, PseudoUpdateComponent, PseudoUpdateModule } from '@input-output-labs/ngleaf';
import { OrganizationSettingsLayoutComponent } from './organization-settings-layout/organization-settings-layout.component';
import { OrganizationSettingsLayoutModule } from './organization-settings-layout/organization-settings-layout.module';


const routes: Routes = [
  {
    path: '',
    component: OrganizationSettingsLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'members',
        pathMatch: 'full',
      },
      {
        path: 'members',
        component: PseudoUpdateComponent,
      },
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    /* Leaf deps */
    PseudoUpdateModule,
    AvatarUpdateModule,
    PasswordUpdateModule,
    /* App deps */
    OrganizationSettingsLayoutModule
  ],
})
export class OrganizationSettingsModule { }
