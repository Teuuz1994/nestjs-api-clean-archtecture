import { UserModel } from '../../domain/models/UserModel';

export interface FindUserByEmailRepository {
  findByEmail(email: string): Promise<UserModel>;
}
