import { NgModule } from '@angular/core';
import { LeafSessionModule } from '../../services/core/session/leaf-session.module';
import { LeafRedirectionsGuardService } from './leaf-redirections.guard';
import { RedirectionApiClientModule } from '../../api/index';

@NgModule({
    imports: [LeafSessionModule, RedirectionApiClientModule],
    providers: [LeafRedirectionsGuardService]
})
export class LeafRedirectionsGuardModule {}
