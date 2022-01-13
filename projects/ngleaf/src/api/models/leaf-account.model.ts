export interface LeafPrivateTokenModel {
  name?: string;
  created?: Date;
  expiration?: Date;
  accountId?: string;
}

export interface LeafUserModel {
  id?: string;
  username?: string;
  avatarUrl?: string;
}

export interface LeafAccountModel extends LeafUserModel {
  email: string;
  password?: string;
  admin?: boolean;
  privateTokens?: LeafPrivateTokenModel[];
}
