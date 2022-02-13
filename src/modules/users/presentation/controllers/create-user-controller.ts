import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';

import { CreationUser } from '../../domain';
import { CreateUserDto } from '../../dto/create-user.dto';

@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreationUser) {}

  @Post()
  async handle(@Body() user: CreateUserDto) {
    try {
      const users = await this.createUserUseCase.execute(user);
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
