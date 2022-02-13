import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from './entities/user';

export abstract class UpdateUser {
  abstract execute(id: string, user: UpdateUserDto): Promise<User>;
}
