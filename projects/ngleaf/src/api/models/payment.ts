export interface LeafPaymentPlanFeature {
    name: string;
    type: string;
    value: string;
}

export interface LeafPaymentPlanPricing {
    price?: number;
    period?: string;
    free?: boolean;
}

export interface LeafPaymentPlan {
    name: string;
    features: LeafPaymentPlanFeature[];
    pricing: LeafPaymentPlanPricing;
    color: string;
}
