import { NgModule } from '@angular/core';
import { AccountApiClientModule } from '../../../api/clients/index';
import { LeafNotificationModule } from '../notification/leaf-notification.module';
import { LeafSessionService } from './leaf-session.service';

@NgModule({
    imports: [LeafNotificationModule, AccountApiClientModule],
    providers: [LeafSessionService]
})
export class LeafSessionModule {}
