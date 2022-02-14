import { User } from '../../domain/entities/user';

export interface FindAllUsersRepository {
  findAll(): Promise<User[]>;
}
