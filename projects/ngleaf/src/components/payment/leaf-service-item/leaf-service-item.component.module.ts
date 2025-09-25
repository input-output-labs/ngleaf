import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from '@ngx-translate/core';

import { LeafServiceItemComponent } from './leaf-service-item.component';
import { LeafConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import { LeafIconInputModule } from '../../common';

@NgModule({
  declarations: [
    LeafServiceItemComponent
  ],
  imports: [
    /* Core deps */
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    /* Material deps */
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatCheckboxModule,
    /* Leaf deps */
    LeafIconInputModule,
  ],
  exports: [
    LeafServiceItemComponent
  ]
})
export class LeafServiceItemComponentModule { }
