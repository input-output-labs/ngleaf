import { LeafAccountModel } from '../../../models/leaf-account.model';

export interface SessionState {
  currentAccount: LeafAccountModel | null;
  sessionLoading: boolean;
}
