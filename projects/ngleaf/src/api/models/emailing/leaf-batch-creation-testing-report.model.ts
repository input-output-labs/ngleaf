import { LeafBatchCreationAction } from "./leaf-batch-creation-action.model";

export interface LeafBatchCreationTestingReport {
  input: LeafBatchCreationAction;
  targetOk: boolean;
  titleOk: boolean;
  emailsPerHourOk: boolean;
  sendgridIdOk: boolean;
  testingEmailTargetOk: boolean;
  targetAccountsCount: number;
}
