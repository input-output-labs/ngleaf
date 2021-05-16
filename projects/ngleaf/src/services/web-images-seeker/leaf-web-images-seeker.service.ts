import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { LeafConfigServiceToken } from '../leaf-config.module';

@Injectable()
export class LeafWebImagesSeekerService {

  constructor(
    private http: HttpClient,
    @Inject(LeafConfigServiceToken) private config) { }

  public searchImages(searchValue: string): Observable<string[]> {
    if (searchValue) {
      const query = searchValue.replace(' ', '+');
      const apiKey = this.config.apis.pixabay_api_key;
      return this.http.get<any>(`https://pixabay.com/api/?q=${query}&key=${apiKey}&lang=fr`).pipe(
        map(response =>
          response.hits.map(hit => hit.webformatURL)
       ));
    }
    return of([]);
  }
}
