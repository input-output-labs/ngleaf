import { NgModule } from '@angular/core';
import { LeafSessionModule } from '../../services/core/session/leaf-session.module';
import { LeafAuthGuardService } from './leaf-auth.guard';

@NgModule({
    imports: [LeafSessionModule],
    providers: [LeafAuthGuardService]
})
export class LeafAuthGuardModule {}
