import { UpdateUserDto } from '../../dto/update-user.dto';
import { UserModel } from '../../domain/models/UserModel';

export interface UpdateUserRepository {
  updateUser(id: string, user: UpdateUserDto): Promise<UserModel>;
}
