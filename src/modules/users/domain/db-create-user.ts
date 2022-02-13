import { CreateUserDto } from '../dto/create-user.dto';
import { User } from './entities/user';

export abstract class CreationUser {
  abstract execute(user: CreateUserDto): Promise<User>;
}
