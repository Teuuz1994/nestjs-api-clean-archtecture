import { Controller, Post, Body, Inject } from '@nestjs/common';

import { UserCredentialsDTO } from '../../dto/user-credentials-dto';
import { Authentication } from '../../domain/authentication';
import { AUTH_TOKEN_INJECTION } from '../../infra/tokens/auth-token-injection';

@Controller('auth')
export class AuthenticationController {
  constructor(
    @Inject(AUTH_TOKEN_INJECTION.REMOTE_AUTHENTICATION)
    private readonly remoteAuthentication: Authentication,
  ) {}

  @Post()
  async handle(@Body() { email, password }: UserCredentialsDTO) {
    const data = await this.remoteAuthentication.execute({
      email,
      password,
    });
    return data;
  }
}
