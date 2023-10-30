export interface LeafEligibility {
  eligible: boolean;
  reasons: string[];
}

export type LeafEligibilities = {[key: string]: LeafEligibility};
