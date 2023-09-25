import { LeafAccountModel } from "./leaf-account.model";

export interface OrganizationMembership {
  accountId: string;
  role: string;
  metadata: any;
  user?: LeafAccountModel;
}

export type OrganizationInvitationStatus = 'INVITED' | 'DECLINED' | 'CANCELLED' | 'ACCEPTED';

export interface OrganizationInvitation {
  accountId: string;
  email: string;
  metadata: any;
  status: OrganizationInvitationStatus;
}

export interface OrganizationInvitationData {
  name: string;
  invitation: OrganizationInvitation;
}

export interface LeafOrganization {
  id?: string;
  name: string;
  metadata?: any;
  members?: OrganizationMembership[];
  invitations?: OrganizationInvitation[];
  modules?: {[moduleName: string]: any};
}
