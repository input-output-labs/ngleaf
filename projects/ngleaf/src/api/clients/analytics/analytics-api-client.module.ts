import { NgModule } from '@angular/core';
import { LeafAnalyticsApiClient } from './analytics-api-client.service';

@NgModule({
    providers: [LeafAnalyticsApiClient]
})
export class LeafAnalyticsApiClientModule {}
