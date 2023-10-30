import { LeafEligibilities } from '../../../api/models/leaf-eligilibities';
import { AsyncType } from '../../common/index';

export interface EligibilitiesState {
  eligibilities: AsyncType<LeafEligibilities>;
}
