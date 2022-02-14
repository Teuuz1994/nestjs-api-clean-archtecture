import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '../infra/typeorm/repository/user-repository';
import { TOKEN_INJECTION } from '../infra/tokens/token-injection';
import { HashAdapter, CypherCompare } from '../infra/hash-provider';
import { GenerateUuidAdapter } from '../infra/generator/id-generator';

import {
  CreateUserUseCase,
  LIstAllUsersUserCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from '../data/use-cases';

import {
  ListUsersController,
  CreateUserController,
  UpdateUserController,
  DeleteUserController,
} from '../presentation/controllers';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [
    ListUsersController,
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
  ],
  providers: [
    {
      provide: TOKEN_INJECTION.HASH_PROVIDER,
      useClass: HashAdapter,
    },
    {
      provide: TOKEN_INJECTION.DB_LIST_ALL_USERS,
      useClass: LIstAllUsersUserCase,
    },
    {
      provide: TOKEN_INJECTION.DB_CREATE_USER,
      useClass: CreateUserUseCase,
    },
    {
      provide: TOKEN_INJECTION.DB_UPDATE_USER,
      useClass: UpdateUserUseCase,
    },
    {
      provide: TOKEN_INJECTION.COMPARE_HASH_PROVIDER,
      useClass: CypherCompare,
    },
    {
      provide: TOKEN_INJECTION.DB_DELETE_USER,
      useClass: DeleteUserUseCase,
    },
    {
      provide: TOKEN_INJECTION.ID_GENERATOR,
      useClass: GenerateUuidAdapter,
    },
  ],
})
export class UsersModule {}
