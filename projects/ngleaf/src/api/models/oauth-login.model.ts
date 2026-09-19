export type OAuthProvider = 'google' | 'apple' | string;

export interface OAuthLoginModel {
  provider: OAuthProvider;
  idToken: string;
  /** Display name, only given by Apple on the very first sign-in. */
  name?: string;
  firstname?: string;
  lastname?: string;
}

export interface OAuthLoginResponse {
  token: string;
  /** True when this sign-in created the account instead of logging into an existing one. */
  created: boolean;
  provider: OAuthProvider;
}

export interface OAuthIdentityModel {
  provider: OAuthProvider;
  email?: string;
  linkedAt?: string;
}
