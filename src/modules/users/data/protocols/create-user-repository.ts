import { User } from '../../domain/entities/user';
import { CreateUserDto } from '../../dto/create-user.dto';

export interface CreateUserRepository {
  createUser(user: CreateUserDto): Promise<User>;
}
