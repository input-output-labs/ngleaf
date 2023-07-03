import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OrganizationsEffects } from './organizations.effects';
import { organizationsReducer } from './organizations.reducers';
import { OrganizationsApiClientModule } from '../../../api';

@NgModule({
    imports: [
        EffectsModule.forFeature([OrganizationsEffects]),
        StoreModule.forFeature(
            'organizations',
            organizationsReducer,
            {
               // metaReducers: [storageMetaReducer]
            }
        ),
        OrganizationsApiClientModule,
    ]
})
export class LeafOrganizationStoreModule { }
