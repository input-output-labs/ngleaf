import { NgModule } from '@angular/core';
import { LeafSessionModule } from '../../services';
import { LeafAdminGuardService } from './leaf-admin.guard';

@NgModule({
    imports: [LeafSessionModule],
    providers: [LeafAdminGuardService]
})
export class LeafAdminGuardModule {}
