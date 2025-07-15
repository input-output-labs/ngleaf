import { LeafAccountModel, LeafAccountProfile } from "./leaf-account.model";

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

export interface OrganizationPolicy {
  order: number;
  name: string;
  type: string;
  value: string;
}

export interface OrganizationRole {
  creatorDefault: boolean;
  otherDefault: boolean;
  name: string;
  rights: OrganizationPolicy[];
}

export interface OrganizationPolicies {
  roles: OrganizationRole[];
  policies: OrganizationPolicy[];
}

export interface LeafOrganization {
  id?: string;
  name: string;
  profile?: LeafAccountProfile;
  metadata?: any;
  members?: OrganizationMembership[];
  invitations?: OrganizationInvitation[];
  policies?: OrganizationPolicies;
  modules?: {[moduleName: string]: any};
  genericData?: {
    [key: string]: string;
  };
}
