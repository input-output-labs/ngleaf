import { NgModule } from '@angular/core';
import { MessengerApiClientModule } from '../../api/clients/index';
import { LeafMessengerService } from './messenger.service';

@NgModule({
    imports: [MessengerApiClientModule],
    providers: [LeafMessengerService]
})
export class LeafMessengerModule {}
