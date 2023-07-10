import { LeafAccountProfile } from "./leaf-account.model";

export interface SponsoringModel {
  sponsorCode: string;
  sponsorId: string;
  affiliatedIds: string[];
}

export interface SponsoringProfileModel {
  sponsor: LeafAccountProfile;
  affiliates: LeafAccountProfile[];
}
