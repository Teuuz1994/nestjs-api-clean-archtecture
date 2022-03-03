import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';

import { DbListAllUsers } from '../../domain';
import { TOKEN_INJECTION } from '../../infra/tokens/token-injection';

@Controller('users')
export class ListUsersController {
  constructor(
    @Inject(TOKEN_INJECTION.DB_LIST_ALL_USERS)
    private readonly listUsersUseCase: DbListAllUsers,
  ) {}

  @Get()
  async handle() {
    try {
      const users = await this.listUsersUseCase.execute();
      return users;
    } catch {
      throw new InternalServerErrorException({
        message: 'Internal Server error',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
