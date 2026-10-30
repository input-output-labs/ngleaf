export interface LeafNavigationConfig {
  authGuardErrorRedirect?: string;
  adminGuardErrorRedirect?: string;
  profileGuardErrorRedirect?: string;
  organizationSelectedGuardErrorRedirectNoSelectionPossible?: string;
  organizationSelectedGuardErrorRedirectSelectionPossible?: string;
  loginSuccessRedirect?: string;
  registerSuccessRedirect?: string;
  logoutRedirect?: string;
  afterInvitationRedirect?: string;
  candidatureUri?: string;
}

export interface LeafFeatureActivation {
  sponsoring?: boolean;
}

export interface ApisConfig {
  pixabay_api_key?: string;
}

export interface LeafSetupConfig {
  notifications: boolean,
  organizations: boolean,
  eligibilities: boolean,
}

export interface LeafDialogWidthConfig {
  small: string;
  medium: string;
  large: string;
}

export interface LeafMatFieldCustomization {
  appearance?: 'fill' | 'outline';
  subscriptSizing?: 'fixed' | 'dynamic';
  floatLabel?: 'always' | 'auto';
  extraClass?: string;
}

export interface LeafMaterialCustomization {
  'mat-field'?: LeafMatFieldCustomization;
}

export interface LeafUICustomizationConfig {
  dialogWidth: LeafDialogWidthConfig;
  material?: LeafMaterialCustomization;
}

export interface LeafLegalNoticeConfig {
  enable: boolean;
  legalNoticeLink: string;
  /** ISO-8601. An acceptance older than this instant must be renewed. */
  requiredApprovalAt: string;
  illustrationUrl?: string;
  panelClass?: string | string[];
  width?: string;
}

export interface LeafConfig {
  serverUrl: string;
  serverWSBrokerUrl: string;
  navigation: LeafNavigationConfig;
  apis?: ApisConfig;
  featureActivation?: LeafFeatureActivation,
  setupConfig: LeafSetupConfig;
  uiCustomization?: LeafUICustomizationConfig;
  legalNotice?: LeafLegalNoticeConfig;
}
