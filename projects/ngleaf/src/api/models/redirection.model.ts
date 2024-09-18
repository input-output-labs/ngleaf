export interface LeafRedirectionUpdate {
  redirectUrl: string;
}

export interface LeafRedirection {
  id: string;
  creationBatchId: string;
  redirectUrl?: string;
}

export interface LeafRedirectionCreationBatchCreation {
	size: number;
	comment: string;
}

export interface LeafRedirectionCreationBatch extends LeafRedirectionCreationBatchCreation {
  id: string;
	startAt: number;
	endAt: number;
	creatorId: string;
	metadata: any;
}
