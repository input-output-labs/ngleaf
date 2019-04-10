export interface LeafAccountModel {
  username?: string;
  email: string;
  teamId?: string; // TODO: TO REMOVE?
  password?: string;
  admin?: boolean;
}
