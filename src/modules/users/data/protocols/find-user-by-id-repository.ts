import { User } from '../../infra/typeorm/entities/user';

export interface FindUserByIdRepository {
  findById(id: string): Promise<User>;
}
