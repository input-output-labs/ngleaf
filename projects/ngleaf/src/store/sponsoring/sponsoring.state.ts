import { LeafAccountModel, SponsoringProfileModel } from '../../api/index';
import { AsyncType } from '../common/index';

export interface SponsoringState {
  setSponsor: AsyncType<LeafAccountModel>;
  sponsoringProfiles: AsyncType<SponsoringProfileModel>;
  sponsorCode?: string;
}
