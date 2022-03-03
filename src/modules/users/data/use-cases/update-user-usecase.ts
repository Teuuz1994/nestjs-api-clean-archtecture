import {
  HttpStatus,
  Injectable,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DbUpdateUser } from '../../domain';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { UserRepository } from '../../infra/typeorm/repository/user-repository';
import { UserModel } from '../../domain/models/UserModel';
import { TOKEN_INJECTION } from '../../infra/tokens/token-injection';
import {
  FindUserByIdRepository,
  HashProvider,
  UpdateUserRepository,
} from '../protocols';

@Injectable()
export class UpdateUserUseCase implements DbUpdateUser {
  constructor(
    @InjectRepository(UserRepository)
    private readonly findUserByIdRepository: FindUserByIdRepository,

    @InjectRepository(UserRepository)
    private readonly udateUserRepository: UpdateUserRepository,

    @Inject(TOKEN_INJECTION.HASH_PROVIDER)
    private readonly hashProvider: HashProvider,
  ) {}
  async execute(id: string, user: UpdateUserDto): Promise<UserModel> {
    const userAlreadyExists = await this.findUserByIdRepository.findById(id);

    if (!userAlreadyExists) {
      throw new BadRequestException({
        message: 'Email or password is incorrect',
        code: HttpStatus.BAD_REQUEST,
      });
    }

    const hashedPassword = await this.hashProvider.cypher(user.password);

    const updatedUser = await this.udateUserRepository.updateUser(
      userAlreadyExists.id,
      {
        ...user,
        password: hashedPassword,
      },
    );
    return updatedUser;
  }
}
