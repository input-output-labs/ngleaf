import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

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
    MatCommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [LeafWebImagesSeekerService]
})
export class LeafWebImagesSeekerModule { }
