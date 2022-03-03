import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../infra/typeorm/entities/user';

export interface DbCreateUser {
  execute(user: CreateUserDto): Promise<User>;
}
