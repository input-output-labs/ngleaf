import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RedirectionCreationBatchListComponent } from './redirection-creation-batch-list.component';
import { RedirectionApiClientModule } from '../../../api/clients/redirection-api-client';
import { MatExpansionModule } from '@angular/material/expansion';
import { LeafRedirectionsListModule } from '../leaf-redirections-list';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatExpansionModule,
    RedirectionApiClientModule,
    LeafRedirectionsListModule,
  ],
  declarations: [RedirectionCreationBatchListComponent],
  exports: [RedirectionCreationBatchListComponent]
})
export class RedirectionCreationBatchListModule { }
