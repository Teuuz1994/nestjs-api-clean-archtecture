import { User } from '../../domain/entities/user';
import { CreateUserDto } from '../../dto/create-user.dto';

export interface CreateUserRepository {
  createUser(idGenerator: string, user: CreateUserDto): Promise<User>;
}
