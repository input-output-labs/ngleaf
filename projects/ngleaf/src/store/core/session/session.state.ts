import { JWTModel, LeafAccountModel } from '../../../api/models/index';
import { AsyncType } from '../../common/index';

export interface SessionState {
  currentAccount: AsyncType<LeafAccountModel>;
  sessionToken: AsyncType<JWTModel>;
  sendResetPasswordKey: AsyncType<void>;
  resetPassword: AsyncType<void>;
  updatePassword: AsyncType<LeafAccountModel>;
  mailingsUnsubscription: AsyncType<void>;
}
