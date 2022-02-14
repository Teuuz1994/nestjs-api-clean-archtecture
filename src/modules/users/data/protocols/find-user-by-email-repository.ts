import { User } from '../../domain/entities/user';

export interface FindUserByEmailRepository {
  findByEmail(email: string): Promise<User>;
}
