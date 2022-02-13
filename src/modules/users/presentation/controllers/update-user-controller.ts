import {
  Controller,
  HttpException,
  HttpStatus,
  Put,
  Body,
  Param,
} from '@nestjs/common';

import { UpdateUser } from '../../domain';
import { UpdateUserDto } from '../../dto/update-user.dto';

@Controller('users')
export class UpdateUserController {
  constructor(private readonly updateUserUseCase: UpdateUser) {}

  @Put(':id')
  async handle(@Param('id') id: string, @Body() user: UpdateUserDto) {
    try {
      const updatedUser = await this.updateUserUseCase.execute(id, user);
      return updatedUser;
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
