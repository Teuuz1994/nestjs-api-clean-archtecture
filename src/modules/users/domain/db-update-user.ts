import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from './entities/user';

export interface DbUpdateUser {
  execute(id: string, user: UpdateUserDto): Promise<User>;
}
