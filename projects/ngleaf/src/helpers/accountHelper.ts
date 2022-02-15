import { LeafAccountModel } from '../api/models/index';

export function getModule(account: LeafAccountModel, moduleName: string): any | undefined {
  return account.modules && account.modules[moduleName];
}
