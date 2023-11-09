import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { paymentReducer } from './payment.reducers';
import { PaymentEffects } from './payment.effects';
import { PaymentApiClientModule } from '../../api/clients/payment-api-client';

@NgModule({
    imports: [
        EffectsModule.forFeature([PaymentEffects]),
        StoreModule.forFeature(
            'payment',
            paymentReducer,
            { 
                metaReducers: []
            }
        ),
        PaymentApiClientModule,
    ]
})
export class PaymentStoreModule { }