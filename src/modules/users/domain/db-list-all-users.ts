import { UserModel } from './models/UserModel';

export interface DbListAllUsers {
  execute(): Promise<UserModel[]>;
}
