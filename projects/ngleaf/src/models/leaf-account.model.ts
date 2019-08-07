export interface LeafPrivateTokenModel {
  name?: string;
  created?: Date;
  expiration?: Date;
  accountId?: string;
}

export interface LeafAccountModel {
  id?: string;
  username?: string;
  email: string;
  password?: string;
  admin?: boolean;
  privateTokens?: LeafPrivateTokenModel[];
}
