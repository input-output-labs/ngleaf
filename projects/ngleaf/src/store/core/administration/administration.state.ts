import { LeafAccountModel, LeafAuthorizedEmailModel } from '../../../api/models/index';

export interface AdmininistrationState {
  authorizedEmails: LeafAuthorizedEmailModel[];
  administrators: string[];
  users: LeafAccountModel[];
}
