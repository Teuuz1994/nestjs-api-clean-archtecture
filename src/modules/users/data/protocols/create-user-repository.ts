import { CreateUserDto } from '../../dto/create-user.dto';
import { UserModel } from '../../domain/models/UserModel';

export interface CreateUserRepository {
  createUser(user: CreateUserDto): Promise<UserModel>;
}
