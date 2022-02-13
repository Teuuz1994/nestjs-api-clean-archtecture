import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../domain/entities/user';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { UserRepository } from '../../infra/typeorm/repository/user-repository';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @InjectRepository(UserRepository)
    private readonly ormRepository: UserRepository,
  ) {}
  async execute(id: string, user: UpdateUserDto): Promise<User> {
    const userAlreadyExists = await this.ormRepository.findById(id);

    if (!userAlreadyExists) {
      throw new HttpException(
        {
          message: 'Email or password is incorrect',
          code: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedUser = await this.ormRepository.updateUser(
      userAlreadyExists.id,
      user,
    );
    return updatedUser;
  }
}
