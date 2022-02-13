import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../domain/entities/user';
import { UserRepository } from '../../infra/typeorm/repository/user-repository';

@Injectable()
export class LIstAllUsersUserCase {
  constructor(
    @InjectRepository(UserRepository)
    private readonly ormRepository: UserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return this.ormRepository.findALl();
  }
}
