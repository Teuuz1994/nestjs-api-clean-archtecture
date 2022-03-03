import {
  Controller,
  HttpStatus,
  Post,
  Body,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';

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
    try {
      const users = await this.createUserUseCase.execute(user);
      return users;
    } catch {
      throw new InternalServerErrorException({
        message: 'Internal Server error',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
