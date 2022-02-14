import { User } from './entities/user';

export interface DbListAllUsers {
  execute(): Promise<User[]>;
}
