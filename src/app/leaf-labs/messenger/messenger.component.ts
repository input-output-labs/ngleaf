import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map } from 'rxjs';

import { selectRoomCreation, AsyncType, LeafRoomModel } from '@input-output-labs/ngleaf';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: false,
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent {

  constructor(private store: Store, private _snackBar: MatSnackBar) {
    this.store.pipe(
      select(selectRoomCreation),
      filter((roomCreationAsyncItem: AsyncType<LeafRoomModel>) => !roomCreationAsyncItem.status.pending),
      map((roomCreationAsyncItem: AsyncType<LeafRoomModel>)  => {
        if (roomCreationAsyncItem.status.success) {
          return "Room with name " + roomCreationAsyncItem.data.name + " was successfully created." ;
        } else if (roomCreationAsyncItem.status.failure) {
          return "Error when creating the room";
        }
      })
    ).subscribe((roomCreationMessage) => {
      this._snackBar.open(roomCreationMessage, "Ok !");
    });
  }
}
