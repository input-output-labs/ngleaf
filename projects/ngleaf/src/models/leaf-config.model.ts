export interface LeafNavigationConfig {
  authGuardErrorRedirect?: string;
  adminGuardErrorRedirect?: string;
  loginSuccessRedirect?: string;
  registerSuccessRedirect?: string;
  logoutRedirect?: string;
}

export interface ApisConfig {
  pixabay_api_key?: string;
}

export interface LeafConfig {
  serverUrl: string;
  navigation: LeafNavigationConfig;
  apis?: ApisConfig;
}
