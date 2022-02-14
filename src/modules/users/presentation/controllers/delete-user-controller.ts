import {
  Controller,
  HttpException,
  HttpStatus,
  Delete,
  Param,
} from '@nestjs/common';

import { DbDeleteUser } from '../../domain';

@Controller('users')
export class DeleteUserController {
  constructor(private readonly deleteUserUseCase: DbDeleteUser) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    try {
      await this.deleteUserUseCase.execute(id);
      throw new HttpException(
        {
          message: 'User successfully deleted!',
          code: HttpStatus.OK,
        },
        HttpStatus.OK,
      );
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
