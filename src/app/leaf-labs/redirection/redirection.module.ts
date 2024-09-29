import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedirectionComponent } from './redirection.component';
import { RedirectionCreationBatchListModule, LeafRedirectionCreationBatchFormModule } from '@input-output-labs/ngleaf';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    /* material deps */
    MatDividerModule,
    /* leaf deps */
    RedirectionCreationBatchListModule,
    LeafRedirectionCreationBatchFormModule,
  ],
  declarations: [RedirectionComponent],
  exports: [RedirectionComponent]
})
export class RedirectionModule { }
