export interface LeafPrice {
  currency: string;
  amount: number;
}

export interface LeafInvoice {
  price: LeafPrice;
  creationDate: Date;
  paid: boolean;
  pdfUrl: string;
}

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
    descriptions: string[];
    pricing: LeafPaymentPlanPricing;
    suspended: boolean;
    suspensionBackupPlan: LeafPaymentPlan;
    trialDuration: number;
    startedAt: Date;
    inTrial: boolean;
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
	paymentMethod: PaymentMethod;
}
