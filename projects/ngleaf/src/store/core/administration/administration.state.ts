import { LeafAuthorizedEmailModel } from '../../../models/leaf-authorized-email.model';

export interface AdmininistrationState {
  authorizedEmails: LeafAuthorizedEmailModel[];
  administrators: string[];
}
