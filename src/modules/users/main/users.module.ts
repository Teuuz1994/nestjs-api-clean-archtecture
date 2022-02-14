import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '../infra/typeorm/repository/user-repository';
import {
  composeControllersFactory,
  composeProvidersFactory,
} from './factories';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: composeControllersFactory(),
  providers: composeProvidersFactory(),
})
export class UsersModule {}
