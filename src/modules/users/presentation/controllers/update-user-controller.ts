import {
  Controller,
  HttpStatus,
  Put,
  Body,
  Param,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';

import { DbUpdateUser } from '../../domain';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { TOKEN_INJECTION } from '../../infra/tokens/token-injection';

@Controller('users')
export class UpdateUserController {
  constructor(
    @Inject(TOKEN_INJECTION.DB_UPDATE_USER)
    private readonly updateUserUseCase: DbUpdateUser,
  ) {}

  @Put(':id')
  async handle(@Param('id') id: string, @Body() user: UpdateUserDto) {
    try {
      const updatedUser = await this.updateUserUseCase.execute(id, user);
      return updatedUser;
    } catch {
      throw new InternalServerErrorException({
        message: 'Internal Server error',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
