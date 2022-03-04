import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Authentication } from '../../domain/authentication';
import { AuthenticationModel } from '../../domain/models/authentication-model';
import { AUTH_TOKEN_INJECTION } from '../../infra/tokens/auth-token-injection';
import { CheckUserCredentials } from '../../data/protocols';
import { UserCredentialsDTO } from '../../dto/user-credentials-dto';

@Injectable()
export class RemoteAuthentication implements Authentication {
  constructor(
    @Inject(AUTH_TOKEN_INJECTION.CHECK_USER_CREDENTIALS)
    private readonly checkUserCredentials: CheckUserCredentials,

    private readonly jwtService: JwtService,
  ) {}

  async execute({
    email,
    password,
  }: UserCredentialsDTO): Promise<AuthenticationModel> {
    const user = await this.checkUserCredentials.execute(email, password);
    const jwtPayload = {
      id: user.id,
    };
    const accessToken = this.jwtService.sign(jwtPayload);
    delete user.password;

    return {
      data: {
        ...user,
      },
      access_token: accessToken,
    };
  }
}
