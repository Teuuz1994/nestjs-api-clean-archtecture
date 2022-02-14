import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DbUpdateUser } from '../../domain';
import { User } from '../../domain/entities/user';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { UserRepository } from '../../infra/typeorm/repository/user-repository';
import { FindUserByIdRepository, UpdateUserRepository } from '../protocols';

@Injectable()
export class UpdateUserUseCase implements DbUpdateUser {
  constructor(
    @InjectRepository(UserRepository)
    private readonly findUserByIdRepository: FindUserByIdRepository,

    @InjectRepository(UserRepository)
    private readonly udateUserRepository: UpdateUserRepository,
  ) {}
  async execute(id: string, user: UpdateUserDto): Promise<User> {
    const userAlreadyExists = await this.findUserByIdRepository.findById(id);

    if (!userAlreadyExists) {
      throw new HttpException(
        {
          message: 'Email or password is incorrect',
          code: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedUser = await this.udateUserRepository.updateUser(
      userAlreadyExists.id,
      user,
    );
    return updatedUser;
  }
}
