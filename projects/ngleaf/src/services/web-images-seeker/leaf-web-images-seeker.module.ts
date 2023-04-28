import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

import { LeafWebImagesSeekerService } from './leaf-web-images-seeker.service';
import { LeafWebImagesSeekerDialogComponent } from './web-images-seeker-dialog/leaf-web-images-seeker-dialog.component';


@NgModule({
  declarations: [LeafWebImagesSeekerDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [LeafWebImagesSeekerService]
})
export class LeafWebImagesSeekerModule { }
