import { UserModel } from '../../domain/models/UserModel';

export interface FindAllUsersRepository {
  findAll(): Promise<UserModel[]>;
}
