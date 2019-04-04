import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}

@Injectable()
export class LeafAuthHttpClient {
  private jwtoken: string;

  // Extending the HttpClient through the Angular DI.
  public constructor(public http: HttpClient) {
    // If you don't want to use the extended versions in some cases you can access the public property and use the original one.
    // for ex. this.httpClient.http.get(...)
  }

  public setJwtoken(jwtoken: string): void {
    this.jwtoken = jwtoken;
  }

  public addHeaders(options?: IRequestOptions): IRequestOptions {
    const authenticatedOptions = options || { headers: new HttpHeaders() };
    authenticatedOptions.headers =
      authenticatedOptions.headers || new HttpHeaders();
    authenticatedOptions.headers = authenticatedOptions.headers.set(
      'Cache-Control',
      'no-cache'
    );
    authenticatedOptions.headers = authenticatedOptions.headers.set(
      'Pragma',
      'no-cache'
    );
    authenticatedOptions.headers = authenticatedOptions.headers.set(
      'Expires',
      'Sat, 01 Jan 2000 00:00:00 GMT'
    );
    if (this.jwtoken) {
      authenticatedOptions.headers = authenticatedOptions.headers.set(
        'Authorization',
        this.jwtoken
      );
      return authenticatedOptions;
    }
    return options;
  }

  public get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.get<T>(endPoint, this.addHeaders(options));
  }

  public post<T>(
    endPoint: string,
    params: any,
    options?: IRequestOptions
  ): Observable<T> {
    return this.http.post<T>(endPoint, params, this.addHeaders(options));
  }

  public patch<T>(
    endPoint: string,
    params: any,
    options?: IRequestOptions
  ): Observable<T> {
    return this.http.patch<T>(endPoint, params, this.addHeaders(options));
  }

  public put<T>(
    endPoint: string,
    params: any,
    options?: IRequestOptions
  ): Observable<T> {
    return this.http.put<T>(endPoint, params, this.addHeaders(options));
  }

  public delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.delete<T>(endPoint, this.addHeaders(options));
  }
}

export function applicationHttpClientCreator(http: HttpClient) {
  return new LeafAuthHttpClient(http);
}
