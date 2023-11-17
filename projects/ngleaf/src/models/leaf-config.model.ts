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
}

export interface LeafFeatureActivation {
  sponsoring?: boolean;
}

export interface ApisConfig {
  pixabay_api_key?: string;
}

export interface LeafConfig {
  serverUrl: string;
  serverWSBrokerUrl: string;
  navigation: LeafNavigationConfig;
  apis?: ApisConfig;
  featureActivation?: LeafFeatureActivation
}
