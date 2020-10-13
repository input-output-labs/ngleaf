import { LeafAuthorizedEmailModel } from '../../../models';

export interface AdmininistrationState {
  authorizedEmails: LeafAuthorizedEmailModel[];
  administrators: string[];
}
