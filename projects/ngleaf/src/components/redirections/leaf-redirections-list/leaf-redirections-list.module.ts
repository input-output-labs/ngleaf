import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafRedirectionsListComponent } from './leaf-redirections-list.component';
import { RedirectionApiClientModule } from '../../../api/clients/redirection-api-client';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    RedirectionApiClientModule,
  ],
  declarations: [LeafRedirectionsListComponent],
  exports: [LeafRedirectionsListComponent]
})
export class LeafRedirectionsListModule { }
