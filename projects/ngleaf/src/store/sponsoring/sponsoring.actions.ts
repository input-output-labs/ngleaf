import { createAction, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LeafAccountModel, SponsoringProfileModel } from '../../api/index';

export const resetSponsoring = createAction(
  '[Sponsoring store] Reset sponsoring'
);

export const setSetSponsorCall = createAction(
  '[Sponsoring store] Set setSponsor call',
  props<{call: Observable<LeafAccountModel>}>()
);
export const setSetSponsorSuccess = createAction(
  '[Sponsoring store] Set setSponsor success',
  props<{data: LeafAccountModel}>()
);
export const setSetSponsorFailure = createAction(
  '[Sponsoring store] Set setSponsor failure',
  props<{error: any}>()
);

export const setSponsoringProfilesCall = createAction(
  '[Sponsoring store] Set sponsoringProfiles call',
  props<{call: Observable<SponsoringProfileModel>}>()
);
export const setSponsoringProfilesSuccess = createAction(
  '[Sponsoring store] Set sponsoringProfiles success',
  props<{data: SponsoringProfileModel}>()
);
export const setSponsoringProfilesFailure = createAction(
  '[Sponsoring store] Set sponsoringProfiles failure',
  props<{error: any}>()
);

export const setSponsorCode = createAction(
  '[Sponsoring store] Set sponsor code',
  props<{sponsorCode?: string}>()
);

