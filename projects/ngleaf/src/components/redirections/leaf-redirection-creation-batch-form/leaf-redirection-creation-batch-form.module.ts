import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafRedirectionCreationBatchFormComponent } from './leaf-redirection-creation-batch-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RedirectionApiClientModule } from '../../../api';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RedirectionApiClientModule,
  ],
  declarations: [LeafRedirectionCreationBatchFormComponent],
  exports: [LeafRedirectionCreationBatchFormComponent]
})
export class LeafRedirectionCreationBatchFormModule { }
