import { ResourceMetadata } from "./resource-metadata.model";

export interface LeafPrivateTokenModel {
  name?: string;
  created?: Date;
  expiration?: Date;
  accountId?: string;
}

export interface LeafAccountAuthentication {
  password?: string;
  privateTokens?: LeafPrivateTokenModel[];
}

export interface LeafAddress {
  address?: string;
  postalCode?: string;
  city?: string;
  country?: string;
}

export interface LeafAccountProfile {
  username?: string;
  avatarUrl?: string;
  firstname?: string;
  lastname?: string;
  phoneNumber?: string;
  address?: LeafAddress;
}

export interface LeafAccountModel {
  id?: string;
  email: string;
  authentication: LeafAccountAuthentication;
  profile: LeafAccountProfile;
  admin?: boolean;
  modules?: {[moduleName: string]: any};
  metadata?: ResourceMetadata;
}
