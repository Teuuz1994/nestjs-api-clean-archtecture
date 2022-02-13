import { User } from './entities/user';

export abstract class LIstAllUsers {
  abstract execute(): Promise<User[]>;
}
