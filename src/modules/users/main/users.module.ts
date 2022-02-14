import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '../infra/typeorm/repository/user-repository';

import { HashProvider, CompareHashProvider } from '../data/protocols';
import { HashAdapter, CypherCompare } from '../infra/hash-provider';

import { LIstAllUsers, CreationUser, UpdateUser } from '../domain';
import {
  CreateUserUseCase,
  LIstAllUsersUserCase,
  UpdateUserUseCase,
} from '../data/use-cases';

import {
  ListUsersController,
  CreateUserController,
  UpdateUserController,
} from '../presentation/controllers';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [
    ListUsersController,
    CreateUserController,
    UpdateUserController,
  ],
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
    {
      provide: UpdateUser,
      useClass: UpdateUserUseCase,
    },
    {
      provide: CompareHashProvider,
      useClass: CypherCompare,
    },
  ],
})
export class UsersModule {}
