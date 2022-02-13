import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../domain/entities/user';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UserRepository } from '../../infra/typeorm/repository/user-repository';
import { HashProvider } from '../protocols/hash-provider';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(UserRepository)
    private readonly ormRepository: UserRepository,

    private readonly hashProvider: HashProvider,
  ) {}

  async execute(user: CreateUserDto): Promise<User> {
    const userAlreadyExists = await this.ormRepository.findByEmail(user.email);

    if (userAlreadyExists) {
      throw new HttpException(
        {
          message: 'Something went wrong, try again later',
          code: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const baseUser = {
      ...user,
      password: await this.hashProvider.cypher(user.password),
    };

    const createdUser = await this.ormRepository.createUser(baseUser);
    return createdUser;
  }
}
