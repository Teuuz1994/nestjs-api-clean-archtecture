import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserModel } from '@/modules/users/domain/models/UserModel';
import { CheckUserCredentials, CompareHashProvider } from '../protocols';
import { UserRepository } from '@/modules/users/infra/typeorm/repository/user-repository';
import { FindUserByEmailRepository } from '@/modules/users/data/protocols';
import { AUTH_TOKEN_INJECTION } from '../../infra/tokens/auth-token-injection';

@Injectable()
export class CheckUserCredentialsService implements CheckUserCredentials {
  constructor(
    @InjectRepository(UserRepository)
    private readonly findByEmailRepository: FindUserByEmailRepository,

    @Inject(AUTH_TOKEN_INJECTION.COMPARE_HASH)
    private readonly comparePasswordCypher: CompareHashProvider,
  ) {}

  async execute(email: string, password: string): Promise<UserModel> {
    const userAlreadyExists = await this.findByEmailRepository.findByEmail(
      email,
    );

    if (!userAlreadyExists) {
      throw new UnauthorizedException();
    }

    const isEqual = await this.comparePasswordCypher.compareCypher(
      password,
      userAlreadyExists.password,
    );

    if (!isEqual) {
      throw new UnauthorizedException();
    }

    return userAlreadyExists;
  }
}
