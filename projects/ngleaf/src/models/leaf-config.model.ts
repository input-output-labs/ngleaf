export interface LeafNavigationConfig {
  authGuardErrorRedirect?: string;
  adminGuardErrorRedirect?: string;
  loginSuccessRedirect?: string;
  registerSuccessRedirect?: string;
}

export interface LeafConfig {
  serverUrl: string;
  navigation: LeafNavigationConfig;
}
