import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {
  RoomCreationFormModule,
  OrganizationSelectorModule,
} from '@input-output-labs/ngleaf';

import { MessengerComponent } from './messenger.component';

@NgModule({
  imports: [
    /* Common deps */
    CommonModule,
    /* Material deps */
    MatDividerModule,
    MatSnackBarModule,
    /* Leaf deps */
    RoomCreationFormModule,
    OrganizationSelectorModule,
  ],
  declarations: [MessengerComponent]
})
export class MessengerModule { }
