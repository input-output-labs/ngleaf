import { LeafAccountModel } from '../../../models/leaf-account.model';
import { LeafAuthorizedEmailModel } from '../../../models/leaf-authorized-email.model';

export interface AdmininistrationState {
  authorizedEmails: LeafAuthorizedEmailModel[];
  administrators: string[];
  users: LeafAccountModel[];
}
