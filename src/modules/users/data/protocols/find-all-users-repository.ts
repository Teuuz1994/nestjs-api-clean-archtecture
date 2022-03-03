import { User } from '../../infra/typeorm/entities/user';

export interface FindAllUsersRepository {
  findAll(): Promise<User[]>;
}
