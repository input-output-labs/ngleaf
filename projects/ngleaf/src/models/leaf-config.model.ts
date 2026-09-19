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

export interface LeafUICustomizationConfig {
  dialogWidth: LeafDialogWidthConfig;
}

export interface LeafOAuthProviderConfig {
  /** Leave empty to disable the provider. */
  clientId: string;
}

export interface LeafAppleOAuthConfig extends LeafOAuthProviderConfig {
  /**
   * Locale of the "Sign in with Apple" script, e.g. `en_US` or `fr_FR`.
   * Defaults to `en_US`.
   */
  locale?: string;
  /**
   * URI Apple redirects to. Must be declared in the Apple developer console.
   * Defaults to the current origin.
   */
  redirectUri?: string;
}

export interface LeafOAuthConfig {
  google?: LeafOAuthProviderConfig;
  apple?: LeafAppleOAuthConfig;
}

export interface LeafConfig {
  serverUrl: string;
  serverWSBrokerUrl: string;
  navigation: LeafNavigationConfig;
  apis?: ApisConfig;
  featureActivation?: LeafFeatureActivation,
  setupConfig: LeafSetupConfig;
  uiCustomization?: LeafUICustomizationConfig;
  oauth?: LeafOAuthConfig;
}
