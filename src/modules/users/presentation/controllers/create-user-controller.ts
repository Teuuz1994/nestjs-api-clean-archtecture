import { Controller, Post, Body, Inject } from '@nestjs/common';

import { DbCreateUser } from '../../domain';
import { CreateUserDto } from '../../dto/create-user.dto';
import { TOKEN_INJECTION } from '../../infra/tokens/token-injection';

@Controller('users')
export class CreateUserController {
  constructor(
    @Inject(TOKEN_INJECTION.DB_CREATE_USER)
    private readonly createUserUseCase: DbCreateUser,
  ) {}

  @Post()
  async handle(@Body() user: CreateUserDto) {
    const users = await this.createUserUseCase.execute(user);
    return users;
  }
}
