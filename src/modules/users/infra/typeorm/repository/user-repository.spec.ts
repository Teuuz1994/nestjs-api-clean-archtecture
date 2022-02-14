import { Test } from '@nestjs/testing';

import { UserRepository } from './user-repository';
import { userMock, userRepositoryMock } from '../tests/mocks';
import {
  CreateUserRepository,
  DeleteUserRepository,
  FindAllUsersRepository,
  FindUserByEmailRepository,
  FindUserByIdRepository,
} from '@/modules/users/data/protocols';

describe('UserRepository', () => {
  let createUserRepository: CreateUserRepository;
  let deleteUserRepository: DeleteUserRepository;
  let findAllUsersRepository: FindAllUsersRepository;
  let findUserByEmailRepository: FindUserByEmailRepository;
  let findUserByIdRepository: FindUserByIdRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: UserRepository,
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    createUserRepository = module.get(UserRepository);
    deleteUserRepository = module.get(UserRepository);
    findAllUsersRepository = module.get(UserRepository);
    findUserByEmailRepository = module.get(UserRepository);
    findUserByIdRepository = module.get(UserRepository);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should be able to list all users', async () => {
    const users = [userMock(), userMock()];
    userRepositoryMock.findAll.mockReturnValue(users);
    const userList = await findAllUsersRepository.findAll();
    const spy = jest.spyOn(findAllUsersRepository, 'findAll');
    expect(spy).toHaveBeenCalled();
    expect(userList).toHaveLength(2);
  });
});
