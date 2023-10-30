import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationMembersComponent, OrganizationMembersModule, OrganizationPoliciesComponent, OrganizationPoliciesModule, } from '@input-output-labs/ngleaf';
import { OrganizationSettingsLayoutComponent } from './organization-settings-layout/organization-settings-layout.component';
import { OrganizationSettingsLayoutModule } from './organization-settings-layout/organization-settings-layout.module';
import { LeafOrganizationGuardService } from '../../services/guards/organization/leaf-organization.guard';
import { LeafOrganizationMembersGuardService } from '../../services/guards/organization/leaf-organization-members.guard';
import { LeafOrganizationPoliciesGuardService } from '../../services/guards/organization/leaf-organization-policies.guard';
import { LeafOrganizationGuardModule } from '../../services/guards/organization/leaf-organization.guard.module';

const routes: Routes = [
  {
    path: '',
    component: OrganizationSettingsLayoutComponent,
    canActivate: [LeafOrganizationGuardService],
    children: [
      {
        path: '',
        redirectTo: 'members',
        pathMatch: 'full',
      },
      {
        path: 'members',
        canActivate: [LeafOrganizationMembersGuardService],
        component: OrganizationMembersComponent,
      },
      {
        path: 'policies',
        canActivate: [LeafOrganizationPoliciesGuardService],
        children: [
          {
            path: '',
            component: OrganizationPoliciesComponent,
          },
          {
            path: ':role',
            component: OrganizationPoliciesComponent,
          }
        ]
      },
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    /* Leaf deps */
    OrganizationMembersModule,
    OrganizationPoliciesModule,
    LeafOrganizationGuardModule,
    /* App deps */
    OrganizationSettingsLayoutModule
  ],
})
export class OrganizationSettingsModule { }
