import { NgModule } from '@angular/core';
import { LeafSessionModule } from '../../services/core/session/leaf-session.module';
import { LeafAdminGuardService } from './leaf-admin.guard';

@NgModule({
    imports: [LeafSessionModule],
    providers: [LeafAdminGuardService]
})
export class LeafAdminGuardModule {}
