import { LeafAccountModel } from "./leaf-account.model";
import { LeafEligibilities } from "./leaf-eligilibities";
import { LeafNotificationModel } from "./notifications.model";
import { LeafOrganization } from "./organizations";

export interface LeafSetupResponse {
  user: LeafAccountModel;
  notifications?: LeafNotificationModel[];
  organizations?: LeafOrganization[];
  eligibilities?: LeafEligibilities;
}
