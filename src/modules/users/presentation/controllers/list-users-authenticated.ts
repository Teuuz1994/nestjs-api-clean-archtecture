import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { DbListAllUsers } from '../../domain';
import { TOKEN_INJECTION } from '../../infra/tokens/token-injection';

@Controller('users')
export class ListUsersAuthenticatedController {
  constructor(
    @Inject(TOKEN_INJECTION.DB_LIST_ALL_USERS)
    private readonly listUsersUseCase: DbListAllUsers,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/auth/list')
  async handle() {
    const users = await this.listUsersUseCase.execute();
    return users;
  }
}
