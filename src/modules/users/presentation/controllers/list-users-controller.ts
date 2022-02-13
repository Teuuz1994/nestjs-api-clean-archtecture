import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

import { LIstAllUsers } from '../../domain';

@Controller('users')
export class ListUsersController {
  constructor(private readonly listUsersUseCase: LIstAllUsers) {}

  @Get()
  async handle() {
    try {
      const users = await this.listUsersUseCase.execute();
      return users;
    } catch {
      throw new HttpException(
        {
          message: 'Internal Server error',
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
