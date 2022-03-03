import { User } from '../infra/typeorm/entities/user';

export interface DbListAllUsers {
  execute(): Promise<User[]>;
}
