import { NgModule } from '@angular/core';
import { LeafOrganizationGuardService } from './leaf-organization.guard';
import { LeafOrganizationMembersGuardService } from './leaf-organization-members.guard';
import { LeafOrganizationPoliciesGuardService } from './leaf-organization-policies.guard';

@NgModule({
    imports: [],
    providers: [
      LeafOrganizationGuardService,
      LeafOrganizationMembersGuardService,
      LeafOrganizationPoliciesGuardService,
    ]
})
export class LeafOrganizationGuardModule {}
