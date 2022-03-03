import { User } from '../../infra/typeorm/entities/user';

export interface FindUserByEmailRepository {
  findByEmail(email: string): Promise<User>;
}
