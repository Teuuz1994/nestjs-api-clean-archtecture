import { CreateUserDto } from '../dto/create-user.dto';
import { UserModel } from './models/UserModel';

export interface DbCreateUser {
  execute(user: CreateUserDto): Promise<UserModel>;
}
