import { UpdateUserDto } from '../dto/update-user.dto';
import { UserModel } from './models/UserModel';

export interface DbUpdateUser {
  execute(id: string, user: UpdateUserDto): Promise<UserModel>;
}
