import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {
  RoomCreationFormModule,
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
  ],
  declarations: [MessengerComponent]
})
export class MessengerModule { }
