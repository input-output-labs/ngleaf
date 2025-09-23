import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OrganizationsEffects } from './organizations.effects';
import { organizationsReducer } from './organizations.reducers';
import { OrganizationsApiClientModule } from '../../../api/clients/organizations-api-client/index';
import { ServicesApiClientModule } from '../../../api/clients/services-api-client/index';
import { storageMetaReducer } from '../../common/storage.metareducer';

@NgModule({
    imports: [
        EffectsModule.forFeature([OrganizationsEffects]),
        StoreModule.forFeature(
            'organizations',
            organizationsReducer,
            {
               metaReducers: [storageMetaReducer]
            }
        ),
        OrganizationsApiClientModule,
        ServicesApiClientModule,
    ]
})
export class LeafOrganizationStoreModule { }
