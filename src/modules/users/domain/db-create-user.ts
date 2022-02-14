import { CreateUserDto } from '../dto/create-user.dto';
import { User } from './entities/user';

export interface DbCreateUser {
  execute(user: CreateUserDto): Promise<User>;
}
