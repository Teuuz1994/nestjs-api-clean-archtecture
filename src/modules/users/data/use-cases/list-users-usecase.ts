import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DbListAllUsers } from '../../domain';
import { UserModel } from '../../domain/models/UserModel';
import { UserRepository } from '../../infra/typeorm/repository/user-repository';
import { FindAllUsersRepository } from '../protocols';

@Injectable()
export class LIstAllUsersUserCase implements DbListAllUsers {
  constructor(
    @InjectRepository(UserRepository)
    private readonly findAllUsersRepository: FindAllUsersRepository,
  ) {}

  async execute(): Promise<UserModel[]> {
    return this.findAllUsersRepository.findAll();
  }
}
