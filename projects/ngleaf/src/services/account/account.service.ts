import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { LeafConfigServiceToken } from '../leaf-config.module';
import { ErrorService } from '../error';
import { httpOptionsBase } from '../../configs/http.config';
import { catchError, take } from 'rxjs/operators';
import { LeafAccountModel } from '../../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url = '';

  private httpOptions = httpOptionsBase;

  public currentAccount$: BehaviorSubject<LeafAccountModel> = new BehaviorSubject<LeafAccountModel>(null);

  constructor(
    @Inject(LeafConfigServiceToken) private config,
    public http: HttpClient,
    public errorService: ErrorService) {
    this.url = this.config.serverUrl + '/account';
  }

  login(account: LeafAccountModel) {
    this.http.post<LeafAccountModel>(this.url + '/login', account, this.httpOptions)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) =>
          this.errorService.handleError<LeafAccountModel>(err, `Login with ${account.email} failed`))
      ).subscribe((acc) => this.currentAccount$.next(acc));
  }

  register(account: LeafAccountModel) {
    this.http.post<{ token: string }>(this.url, account, this.httpOptions)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) =>
          this.errorService.handleError<LeafAccountModel>(err, `User cannot be created`))
      ).subscribe((token) => console.log(token)); // TODO: REPLACE BY THE FINAL DATA
  }


  getAccount() {
    this.http
      .get<LeafAccountModel>(this.url + '/me')
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) =>
          this.errorService.handleError<LeafAccountModel>(err, `Cannot retrieve account`))
      )
      .subscribe(currentAccount => {
        this.currentAccount$.next(currentAccount);
      });
  }

  logout() {
    this.currentAccount$.next(null);
    // TODO: Manage cookie
  }

  changeUsername(username: string) {
    const url = this.url + '/me/username';
    // TODO: REMOVE ANY
    this.http.post<any>(url, username)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) =>
          this.errorService.handleError<LeafAccountModel>(err, `Username cannot be set`))
      ).subscribe(
      () => {
        this.getAccount();
      }
    );
  }

  public changeAvatar(avatar: string) {
    // TODO: REMOVE ANY
    this.http.post<any>(this.url + '/me/avatar', avatar)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) =>
          this.errorService.handleError<LeafAccountModel>(err, `Cannot change avatar for user`))
      ).subscribe(
      () => {
        this.getAccount();
      }
    );
  }

  public changePassword(oldPassword: string, newPassword: string) {
    const passwordChanging = {
      oldPassword,
      newPassword,
    };
    // TODO: REMOVE ANY
    this.http
      .post<any>(this.url + '/me/password', passwordChanging)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) =>
          this.errorService.handleError<LeafAccountModel>(err, `Error when trying to change the password`))
      )
      .subscribe(
        () => {
          this.getAccount();
        });
  }

}
