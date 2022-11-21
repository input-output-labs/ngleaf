import { createAction, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LeafRoomModel } from '../../api/models/messenger.model';

export const resetMessenger = createAction(
  '[Messenger store] Reset statistics'
);
export const setRoomCreationCall = createAction(
  '[Messenger store] Set roomCreation call',
  props<{call: Observable<LeafRoomModel>}>()
);
export const setRoomCreationSuccess = createAction(
  '[Messenger store] Set roomCreation success',
  props<{data: LeafRoomModel}>()
);
export const setRoomCreationFailure = createAction(
  '[Messenger store] Set roomCreation failure',
  props<{error: any}>()
);

