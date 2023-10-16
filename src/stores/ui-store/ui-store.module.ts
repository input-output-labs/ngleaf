import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { uiReducer } from './ui-store.reducers';
import { UiEffects } from './ui-store.effects';
import { storageMetaReducer } from '../storage.metareducer';

@NgModule({
    imports: [
        EffectsModule.forFeature([UiEffects]),
        StoreModule.forFeature(
            'ui',
            uiReducer,
            { 
                metaReducers: [storageMetaReducer]
            }
        ),
    ]
})
export class UiStoreModule { }
