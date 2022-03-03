import {
  Controller,
  HttpStatus,
  Delete,
  Param,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';

import { DbDeleteUser } from '../../domain';
import { TOKEN_INJECTION } from '../../infra/tokens/token-injection';

@Controller('users')
export class DeleteUserController {
  constructor(
    @Inject(TOKEN_INJECTION.DB_DELETE_USER)
    private readonly deleteUserUseCase: DbDeleteUser,
  ) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    try {
      await this.deleteUserUseCase.execute(id);
      return {
        message: 'User deleted successfully',
        code: 200,
      };
    } catch {
      throw new InternalServerErrorException({
        message: 'Internal Server error',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
