import { User } from '../../domain/entities/user';

export interface FindUserByIdRepository {
  findById(id: string): Promise<User>;
}
