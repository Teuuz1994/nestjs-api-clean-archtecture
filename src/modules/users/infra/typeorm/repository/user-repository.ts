import { EntityRepository, Repository } from 'typeorm';

import { User } from '@/modules/users/infra/typeorm/entities/user';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto';
import {
  FindAllUsersRepository,
  CreateUserRepository,
  FindUserByEmailRepository,
  DeleteUserRepository,
  FindUserByIdRepository,
} from '@/modules/users/data/protocols';
import { UserModel } from '@/modules/users/domain/models/UserModel';

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements
    FindAllUsersRepository,
    CreateUserRepository,
    FindUserByEmailRepository,
    DeleteUserRepository,
    DeleteUserRepository,
    FindUserByIdRepository
{
  async findAll(): Promise<User[]> {
    return this.find();
  }

  async findById(id: string): Promise<UserModel> {
    return this.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<UserModel> {
    return this.findOne({
      where: {
        email,
      },
    });
  }

  async createUser(user: CreateUserDto): Promise<UserModel> {
    const baseUser = this.create(user);
    const createdUser = await this.save(baseUser);
    return createdUser;
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<UserModel> {
    const findedUser = await this.findById(id);
    const updatedUser = await this.save(Object.assign(findedUser, user));
    return updatedUser;
  }

  async deleteUserById(id: string): Promise<void> {
    const findedUser = await this.findOne(id);
    await this.remove(findedUser);
  }
}
