import { LeafAccountModel } from './leaf-account.model';

export type AccountSearchOrder = 'FIRST_REGISTERED' | 'LAST_REGISTERED' | 'EMAIL' | 'ADMIN';

export interface AccountSearchCriteria {
  email?: string;
  orderBy?: AccountSearchOrder;
  page?: number;
  pageSize?: number;
}

export interface AccountSearchResponse {
  accounts: LeafAccountModel[];
  totalCount: number;
  pageCount: number;
  currentPage: number;
}
