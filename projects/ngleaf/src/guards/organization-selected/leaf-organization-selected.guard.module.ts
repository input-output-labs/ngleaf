import { NgModule } from '@angular/core';
import { LeafSessionModule } from '../../services/core/session/leaf-session.module';
import { LeafOrganizationSelectedGuardService } from './leaf-organization-selected.guard';
import { LeafOrganizationStoreModule } from '../../store';

@NgModule({
    imports: [
      LeafSessionModule,
      LeafOrganizationStoreModule
    ],
    providers: [LeafOrganizationSelectedGuardService]
})
export class LeafOrganizationSelectedGuardModule {}
