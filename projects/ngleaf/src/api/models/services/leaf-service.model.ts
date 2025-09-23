import { ResourceMetadata } from '../resource-metadata.model';

export enum PlanAttachment {
  USER = 'USER',
  ORGANIZATION = 'ORGANIZATION'
}

export interface LeafService {
  id?: string;
  attachmentType: PlanAttachment;
  attachedTo: string;
  key: string;
  icon?: string;
  unitPrice: number; // in cents
  quantity: number;
  metadata?: ResourceMetadata;
}
