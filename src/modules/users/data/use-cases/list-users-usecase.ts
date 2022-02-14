import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../domain/entities/user';
import { UserRepository } from '../../infra/typeorm/repository/user-repository';
import { FindAllUsersRepository } from '../protocols';

@Injectable()
export class LIstAllUsersUserCase {
  constructor(
    @InjectRepository(UserRepository)
    private readonly findAllUsersRepository: FindAllUsersRepository,
  ) {}

  async execute(): Promise<User[]> {
    return this.findAllUsersRepository.findAll();
  }
}
