export interface OdooContact {
  id: number | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  mobile: string | null;
  companyName: string | null;
  street?: string | null;
  street2?: string | null;
  postalCode?: string | null;
  city?: string | null;
  country?: string | null;
}

export interface OdooOpportunity {
  id: number | null;
  name: string | null;
  contactName: string | null;
  email: string | null;
  phone: string | null;
  expectedRevenue: number | null;
  partnerName: string | null;
  stageId: number | null;
  stageName: string | null;
  tags: string[];
  createdAt: string | null;
  priority?: number | null;
}
