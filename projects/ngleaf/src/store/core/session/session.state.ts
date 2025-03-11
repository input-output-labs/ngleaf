import { JWTModel, LeafAccountModel } from '../../../api/models/index';
import { AsyncType } from '../../common/index';

export interface SessionState {
  initializationOngoing: boolean;
  currentAccount: AsyncType<LeafAccountModel>;
  sessionToken: AsyncType<JWTModel>;
  sendResetPasswordKey: AsyncType<void>;
  resetPassword: AsyncType<void>;
  sendEmailVerificationCode: AsyncType<void>;
  validateEmailVerificationCode: AsyncType<void>;
  updateProfile: AsyncType<LeafAccountModel>;
  updatePassword: AsyncType<LeafAccountModel>;
  mailingsUnsubscription: AsyncType<void>;
}
