import { LeafAccountModel } from "./leaf-account.model";

export interface LeafOrganization {
  id?: string;
  name: string;
  metadata?: any;
  users?: LeafAccountModel[];
  modules?: {[moduleName: string]: any};
}
