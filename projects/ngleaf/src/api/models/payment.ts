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
    color: string;
    available: boolean;
    defaultPlan: boolean;
    features: LeafPaymentPlanFeature[];
    pricing: LeafPaymentPlanPricing;
    suspended: boolean;
    suspensionBackupPlan: LeafPaymentPlan;
}

export interface PaymentMethod {
	brand: string;
    funding: string;
    last4: string;
    expirationMonth: string;
    expirationYear: string;
}

export interface LeafPaymentPlanInfo {
	plan: LeafPaymentPlan;
	trialDone: boolean;
	paymentMethod: PaymentMethod;
}
