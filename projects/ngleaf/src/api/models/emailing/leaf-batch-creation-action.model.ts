import { LeafEmailingCategory } from "./leaf-emailing-category.model";

export interface LeafBatchCreationAction {
  target: LeafEmailingCategory;
  title: string;
  sengridId: string;
  emailsPerHour: number;
  testingEmailTarget: string;
}
