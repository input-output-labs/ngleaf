import { NgModule } from '@angular/core';
import { AccountApiClientModule, SponsoringApiClientModule } from '../../../api/clients/index';
import { LeafSessionService } from './leaf-session.service';

@NgModule({
    imports: [AccountApiClientModule, SponsoringApiClientModule],
    providers: [LeafSessionService]
})
export class LeafSessionModule {}
