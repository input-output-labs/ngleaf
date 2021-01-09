import { HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeafUserModel } from '../../../models/leaf-account.model';
import { LeafConfig } from '../../../models/leaf-config.model';
import { LeafAuthHttpClient, LeafConfigServiceToken } from '../../../services/index';

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
