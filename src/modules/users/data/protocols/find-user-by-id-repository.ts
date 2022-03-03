import { UserModel } from '../../domain/models/UserModel';

export interface FindUserByIdRepository {
  findById(id: string): Promise<UserModel>;
}
