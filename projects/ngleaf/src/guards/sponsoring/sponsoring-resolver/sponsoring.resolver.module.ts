import { NgModule } from '@angular/core';
import { LeafSessionModule } from '../../../services/core/session/leaf-session.module';
import { LeafSponsoringResolver } from './sponsoring.resolver';

@NgModule({
    imports: [LeafSessionModule],
    providers: [LeafSponsoringResolver]
})
export class LeafSponsoringResolverModule {}
