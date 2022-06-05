import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RoomCreationFormComponent } from './room-creation-form.component';
import { GenericFormModule } from '../../common/generic-form/generic-form.module';
import { LeafMessengerModule } from '../../../services/index';

@NgModule({
  declarations: [RoomCreationFormComponent],
  imports: [
    /* Code deps */
    CommonModule,
    ReactiveFormsModule,
    /* Material deps */
    /* Leaf deps */
    GenericFormModule,
    LeafMessengerModule,
  ],
  exports: [RoomCreationFormComponent]
})
export class RoomCreationFormModule {}
