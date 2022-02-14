import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DbDeleteUser } from '../../domain';
import { UserRepository } from '../../infra/typeorm/repository/user-repository';
import { DeleteUserRepository, FindUserByIdRepository } from '../protocols';

@Injectable()
export class DeleteUserUseCase implements DbDeleteUser {
  constructor(
    @InjectRepository(UserRepository)
    private readonly findUserByIdRepository: FindUserByIdRepository,

    @InjectRepository(UserRepository)
    private readonly deleteUserRepository: DeleteUserRepository,
  ) {}
  async execute(id: string): Promise<void> {
    const userAlreadyExists = await this.findUserByIdRepository.findById(id);

    if (!userAlreadyExists) {
      throw new HttpException(
        {
          message: 'User not found',
          code: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.deleteUserRepository.deleteUserById(userAlreadyExists.id);
  }
}
