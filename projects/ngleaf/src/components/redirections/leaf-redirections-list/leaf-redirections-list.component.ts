import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { debounceTime, lastValueFrom, map, Observable, shareReplay, tap } from 'rxjs';

import { LeafRedirection } from '../../../api/models/redirection.model';
import { RedirectionApiClientService } from '../../../api/clients/redirection-api-client';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'leaf-redirections-list',
  templateUrl: './leaf-redirections-list.component.html',
  styleUrls: ['./leaf-redirections-list.component.scss']
})
export class LeafRedirectionsListComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['id', 'input', 'link'];

  public redirections: LeafRedirection[];
  public controls: {[id: string]: FormControl<string>} = {};
  public ongoingUpdates: {[id: string]: boolean} = {};
  public justSaved: {[id: string]: boolean} = {};
  public loading$: Observable<boolean>;

  @Input()
  public batchId: string;

  @Input()
  public canLoad: boolean;

  constructor(private redirectionApiClient: RedirectionApiClientService) { }

  ngOnInit() {
    if (this.canLoad) {
      this.fetchData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.canLoad) {
      if (this.canLoad) {
        this.fetchData();
      }
    }
  }

  fetchData() {
    const redirections$ = this.redirectionApiClient.listAllRedirections(this.batchId).pipe(
      shareReplay({ refCount: true, bufferSize: 1 }),
      tap((redirections) => {
        this.redirections = redirections;
        for (let redirection of redirections) {
          if (!this.controls[redirection.id]) {
            this.controls[redirection.id] = new FormControl();
          }
          this.controls[redirection.id].setValue(redirection.redirectUrl || "", {emitEvent: false});
        }
      }),
    );
    this.loading$ = redirections$.pipe(map((redirections) => !redirections));
  }

  toHex(id: number) {
    let hexStr = id.toString(16);
    while (hexStr.length < 5) {
      hexStr = '0' + hexStr;
    }
    return hexStr;
  }

  onSubmit(event, redirection: LeafRedirection) {
    event.preventDefault();
    this.doSubmit(redirection);
  }

  doSubmit(redirection: LeafRedirection) {
    this.ongoingUpdates[redirection.id] = true;
    lastValueFrom(this.redirectionApiClient.updateById(redirection.id, {redirectUrl: this.controls[redirection.id].value})).then((updatedRedirection) => {
      this.ongoingUpdates[redirection.id] = false;
      this.controls[redirection.id].markAsPristine();
      this.justSaved[redirection.id] = true;
      setTimeout(() => this.justSaved[redirection.id] = false, 2500);
      const redirectionToUpdate = this.redirections.find((r => r.id === redirection.id));
      if (redirectionToUpdate) {
        redirectionToUpdate.redirectUrl = updatedRedirection.redirectUrl;
      }
    });
  }
}
