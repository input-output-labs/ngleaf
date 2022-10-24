import { LeafBatchCreationTestingReport, LeafEmailingCategory } from '../../../api/models/emailing';
import { AsyncType } from '../../common/index';

export interface EmailingState {
  categories: AsyncType<LeafEmailingCategory[]>;
  categoryAction: AsyncType<void>;
  testEmailBatch: AsyncType<LeafBatchCreationTestingReport>;
  emailBatch: AsyncType<void>;
}
