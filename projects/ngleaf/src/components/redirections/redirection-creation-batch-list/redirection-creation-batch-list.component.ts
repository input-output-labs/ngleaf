import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, shareReplay, startWith } from 'rxjs';
import { LeafRedirection, LeafRedirectionCreationBatch } from '../../../api/models/redirection.model';
import { RedirectionApiClientService } from '../../../api/clients/redirection-api-client';
import { FormControl } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'leaf-redirection-creation-batch-list',
  templateUrl: './redirection-creation-batch-list.component.html',
  styleUrls: ['./redirection-creation-batch-list.component.scss']
})
export class RedirectionCreationBatchListComponent implements OnInit {

  public redirectionCreationBatches$: Observable<LeafRedirectionCreationBatch[]>;
  public searchId$: Observable<number | null>;
  public redirectionCreationBatchesOpenState: {[id: string]: boolean} = {};
  public searchFormControl: FormControl<string> = new FormControl("");
  public searchFormControlHex: FormControl<string> = new FormControl("");

  constructor(private redirectionApiClient: RedirectionApiClientService) { }

  ngOnInit() {
    const redirectionCreationBatches$ = this.redirectionApiClient.listAllRedirectionCreationBatches().pipe(
      shareReplay({ refCount: true, bufferSize: 1 })
    );

    this.searchId$ = this.searchFormControl.valueChanges.pipe(
      startWith(null),
      map(value => {
        if (value != null && value != undefined && !Number.isNaN(parseFloat(value))) {
          return parseFloat(value);
        }
        return null;
      })
    );

    this.searchFormControlHex.valueChanges.subscribe((value?: string) => {
      if (value != null && value != undefined) {
        const decimalValue = parseInt(value, 16);
        this.searchFormControl.setValue(`${decimalValue}`);
      }
    });

    this.redirectionCreationBatches$ = combineLatest([
      redirectionCreationBatches$,
      this.searchId$
    ]).pipe(
      map(([redirectionCreationBatches, searchId]) => {
        if (searchId != null) {
          return redirectionCreationBatches.filter(b => b.startAt <= searchId && b.endAt >= searchId);
        }
        return redirectionCreationBatches;
      })
    );
  }

  public openBatch(batch: LeafRedirectionCreationBatch) {
    this.redirectionCreationBatchesOpenState[batch.id] = true;
  }

  toHex(id: number) {
    let hexStr = id.toString(16);
    while (hexStr.length < 5) {
      hexStr = '0' + hexStr;
    }
    return hexStr;
  }
}
