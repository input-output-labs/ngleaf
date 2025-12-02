import { LeafAccountModel, LeafAccountProfile } from "./leaf-account.model";

export interface OrganizationMembership {
  accountId: string;
  role: string;
  metadata: any;
  user?: LeafAccountModel;
}

export type OrganizationInvitationStatus = 'INVITED' | 'DECLINED' | 'CANCELLED' | 'ACCEPTED';

export type OrganizationCandidatureStatus = 'PENDING' | 'CANDIDATED' | 'ACCEPTED' | 'DECLINED';

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

export interface OrganizationCandidature {
  accountId: string;
  email: string;
  role: string;
  metadata: any;
  status: OrganizationCandidatureStatus;
  createdAt?: Date;
  user?: LeafAccountModel;
}

export interface OrganizationCandidatureData {
  organizationName: string;
  error?: "MISSING_ORGANIZATION" | "CANDIDATURE_DISABLED" | "INVALID_ROLE" | "ALREADY_MEMBER_OF_ORGANIZATION";
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

export interface CandidatureManagement {
  enabled: boolean;
  candidatures: OrganizationCandidature[];
}

export interface OrganizationCandidatureData {
  organizationName: string;
  error?: "MISSING_ORGANIZATION" | "CANDIDATURE_DISABLED" | "INVALID_ROLE" | "ALREADY_MEMBER_OF_ORGANIZATION";
}

export interface LeafOrganization {
  id?: string;
  name: string;
  profile?: LeafAccountProfile;
  metadata?: any;
  members?: OrganizationMembership[];
  invitations?: OrganizationInvitation[];
  candidatureManagement?: CandidatureManagement;
  policies?: OrganizationPolicies;
  modules?: {[moduleName: string]: any};
  genericData?: {
    [key: string]: string;
  };
}
