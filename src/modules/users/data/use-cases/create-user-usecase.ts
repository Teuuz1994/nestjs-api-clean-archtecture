import {
  HttpStatus,
  Injectable,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DbCreateUser } from '../../domain';
import { CreateUserDto } from '../../dto/create-user.dto';
import { TOKEN_INJECTION } from '../../infra/tokens/token-injection';
import { UserRepository } from '../../infra/typeorm/repository/user-repository';
import {
  HashProvider,
  FindUserByEmailRepository,
  CreateUserRepository,
} from '../protocols';
import { UserModel } from '../../domain/models/UserModel';

@Injectable()
export class CreateUserUseCase implements DbCreateUser {
  constructor(
    @InjectRepository(UserRepository)
    private readonly findUserByEmailRepository: FindUserByEmailRepository,

    @InjectRepository(UserRepository)
    private readonly createUserRepository: CreateUserRepository,

    @Inject(TOKEN_INJECTION.HASH_PROVIDER)
    private readonly hashProvider: HashProvider,
  ) {}

  async execute(user: CreateUserDto): Promise<UserModel> {
    const userAlreadyExists = await this.findUserByEmailRepository.findByEmail(
      user.email,
    );

    if (userAlreadyExists) {
      throw new BadRequestException({
        message: 'Something went wrong, try again later',
        code: HttpStatus.BAD_REQUEST,
      });
    }

    const baseUser = {
      ...user,
      password: await this.hashProvider.cypher(user.password),
    };

    const createdUser = await this.createUserRepository.createUser(baseUser);
    return createdUser;
  }
}
