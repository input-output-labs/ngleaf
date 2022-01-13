import { LeafAccountModel } from '../../../api/models/index';

export interface SessionState {
  currentAccount: LeafAccountModel | null;
  sessionLoading: boolean;
}
