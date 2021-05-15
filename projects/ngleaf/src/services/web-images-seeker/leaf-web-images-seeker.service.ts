import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { LeafConfig } from '../../models/leaf-config.model';
import { LeafConfigServiceToken } from '../leaf-config.module';
import { LeafWebImagesSeekerDialogComponent } from './web-images-seeker-dialog/leaf-web-images-seeker-dialog.component';

export interface FoundImage {
  url: string;
}

@Injectable()
export class LeafWebImagesSeekerService {

  constructor(
    public dialog: MatDialog,
    @Inject(LeafConfigServiceToken) private config: LeafConfig,
    private http: HttpClient) { }

  public openDialog(prefill?: string): Observable<string> {
    return this.dialog.open(LeafWebImagesSeekerDialogComponent, {
      width: '450px',
      data: { prefill }
    }).afterClosed();
  }


  public searchImages(searchValue: string): Observable<FoundImage[]> {
    if (searchValue) {
      const query = searchValue.replace(' ', '+');
      const apiKey = this.config.apis.pixabay_api_key;
      return this.http.get<any>(`https://pixabay.com/api/?q=${query}&key=${apiKey}&lang=fr`).pipe(
        map(response =>
          response.hits.map(hit => ({
            url: hit.webformatURL
          }))
       ));
    }
    return of([]);
  }
}
