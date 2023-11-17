import { NgModule } from '@angular/core';
import { LeafSessionModule } from '../../services/core/session/leaf-session.module';
import { LeafProfileGuardService } from './leaf-profile.guard';

@NgModule({
    imports: [LeafSessionModule],
    providers: [LeafProfileGuardService]
})
export class LeafProfileGuardModule {}
