export interface LeafPrivateTokenModel {
  name?: string;
  created?: Date;
  expiration?: Date;
  accountId?: string;
}

export interface LeafAccountModel {
  username?: string;
  email: string;
  teamId?: string; // TODO: TO REMOVE?
  password?: string;
  admin?: boolean;
  privateTokens?: LeafPrivateTokenModel[];
}
