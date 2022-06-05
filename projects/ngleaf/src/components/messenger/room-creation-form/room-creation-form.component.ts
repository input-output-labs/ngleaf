import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';


import { LeafAccountModel } from '../../../api/index';
import { selectCurrentAccountData } from '../../../store/index';
import { GenericFormConfig } from '../../common/generic-form/generic-form.component';
import { LeafMessengerService } from '../../../services/index';

@Component({
  selector: 'leaf-room-creation-form',
  templateUrl: './room-creation-form.component.html',
  styleUrls: ['./room-creation-form.component.scss']
})
export class RoomCreationFormComponent {
  public readonly genericFormConfig: GenericFormConfig = {
    titleKey: 'Create room',
    inputs: [
      {
        id: 'roomName',
        type: 'input',
        placeholderKey: 'The place of the zozos...',
        labelKey: 'Enter room name'
      },
      {
        id: 'members',
        type: 'user-selector',
        placeholderKey: 'Enter username',
        multiple: true
      },
      {
        id: 'public',
        type: 'checkbox',
        labelKey: 'Public'
      }
    ],
    actions: [{
      id: 'cancel',
      labelKey: 'Cancel'
    },
    {
      id: 'submit',
      labelKey: 'Create',
      color: 'primary'
    }]
  };
  public formGroup: FormGroup;

  public currentAccount$: Observable<LeafAccountModel>;

  constructor(private store: Store, private fb: FormBuilder, private messengerService: LeafMessengerService) {
    this.formGroup = this.fb.group({
      roomName: ['', Validators.required],
      members: [[]],
      public: [false]
    });
    this.currentAccount$ = this.store.select(selectCurrentAccountData).pipe(filter(account => !!account));
  }

  public actionClicked(event: any) {
    if (event.actionId === 'submit') {
      if (event.valid) {
        const rawValue = this.formGroup.getRawValue();
        this.messengerService.createRoom({
          name: rawValue.roomName,
          members: rawValue.members.map((member) => member.id),
          public: rawValue.public
        });
        console.log(event);
      }
    }
  }
}
