import { HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeafUserModel } from '../../../api/models/index';
import { LeafConfig } from '../../../models/leaf-config.model';
import { LeafConfigServiceToken } from '../../../services/index';
import { LeafAuthHttpClient } from '../../../api/clients/index';

@Injectable()
export class UserAutocompleteService {

    constructor(
        @Inject(LeafConfigServiceToken) public config: LeafConfig,
        public authHttp: LeafAuthHttpClient
    ) {}

    public autocomplete(input: string): Observable<LeafUserModel[]> {
        const params = new HttpParams().set('input', input);
        return this.authHttp.get<LeafUserModel[]>(
            this.config.serverUrl + '/account/autocomplete',
            { params }
        );
    }
}
