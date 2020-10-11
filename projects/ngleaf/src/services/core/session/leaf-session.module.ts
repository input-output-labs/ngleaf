import { NgModule } from '@angular/core';
import { LeafNotificationModule } from '../notification';
import { LeafSessionService } from './leaf-session.service';

@NgModule({
    imports: [LeafNotificationModule],
    providers: [LeafSessionService]
})
export class LeafSessionModule {}
