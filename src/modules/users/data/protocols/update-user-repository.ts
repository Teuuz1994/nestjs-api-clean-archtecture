import { User } from '../../infra/typeorm/entities/user';
import { UpdateUserDto } from '../../dto/update-user.dto';

export interface UpdateUserRepository {
  updateUser(id: string, user: UpdateUserDto): Promise<User>;
}
