import { Component, OnInit } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { LeafRedirection, LeafRedirectionCreationBatch } from '../../../api/models/redirection.model';
import { RedirectionApiClientService } from '../../../api/clients/redirection-api-client';

@Component({
  selector: 'leaf-redirection-creation-batch-list',
  templateUrl: './redirection-creation-batch-list.component.html',
  styleUrls: ['./redirection-creation-batch-list.component.scss']
})
export class RedirectionCreationBatchListComponent implements OnInit {

  public redirectionCreationBatches$: Observable<LeafRedirectionCreationBatch[]>;
  public redirectionCreationBatchesOpenState: {[id: string]: boolean} = {};

  constructor(private redirectionApiClient: RedirectionApiClientService) { }

  ngOnInit() {
    this.redirectionCreationBatches$ = this.redirectionApiClient.listAllRedirectionCreationBatches().pipe(
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  public openBatch(batch: LeafRedirectionCreationBatch) {
    this.redirectionCreationBatchesOpenState[batch.id] = true;
  }
}
