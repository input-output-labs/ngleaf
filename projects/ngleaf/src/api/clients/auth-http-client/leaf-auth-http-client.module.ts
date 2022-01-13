import { NgModule } from '@angular/core';
import { LeafAuthHttpClient } from './leaf-auth-http-client.service';

@NgModule({
    providers: [LeafAuthHttpClient]
})
export class LeafAuthHttpClientModule {}
