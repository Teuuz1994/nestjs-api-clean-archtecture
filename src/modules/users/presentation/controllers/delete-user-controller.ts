import { Controller, Delete, Param, Inject } from '@nestjs/common';

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
    await this.deleteUserUseCase.execute(id);
    return {
      message: 'User deleted successfully',
      code: 200,
    };
  }
}
