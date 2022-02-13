import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '../infra/typeorm/repository/user-repository';

import { HashProvider } from '../data/protocols/hash-provider';
import { HashAdapter } from '../infra/hash-provider/cryptography';

import { LIstAllUsers, CreationUser } from '../domain';
import { CreateUserUseCase, LIstAllUsersUserCase } from '../data/use-cases';

import {
  ListUsersController,
  CreateUserController,
} from '../presentation/controllers';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [ListUsersController, CreateUserController],
  providers: [
    {
      provide: HashProvider,
      useClass: HashAdapter,
    },
    {
      provide: LIstAllUsers,
      useClass: LIstAllUsersUserCase,
    },
    {
      provide: CreationUser,
      useClass: CreateUserUseCase,
    },
  ],
})
export class UsersModule {}
