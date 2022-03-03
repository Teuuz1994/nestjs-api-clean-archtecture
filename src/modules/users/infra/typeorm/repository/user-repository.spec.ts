import { Test } from '@nestjs/testing';

import { UserRepository } from './user-repository';
import { userMock, userRepositoryMock } from '../test/mocks';
import {
  CreateUserRepository,
  DeleteUserRepository,
  FindAllUsersRepository,
  FindUserByEmailRepository,
  FindUserByIdRepository,
  UpdateUserRepository,
} from '@/modules/users/data/protocols';

describe('UserRepository', () => {
  let createUserRepository: CreateUserRepository;
  let updateUserRepository: UpdateUserRepository;
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
    updateUserRepository = module.get(UserRepository);
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

  it('Should be able to find user by id', async () => {
    const user = userMock();
    userRepositoryMock.findById.mockReturnValue(user);
    const findedUser = await findUserByIdRepository.findById(user.id);
    const spy = jest.spyOn(findUserByIdRepository, 'findById');
    expect(spy).toHaveBeenCalled();
    expect(findedUser).toHaveProperty('id');
  });

  it('Should be able to find user by email', async () => {
    const user = userMock();
    userRepositoryMock.findByEmail.mockReturnValue(user);
    const findedUser = await findUserByEmailRepository.findByEmail(user.email);
    const spy = jest.spyOn(findUserByEmailRepository, 'findByEmail');
    expect(spy).toHaveBeenCalled();
    expect(findedUser).toHaveProperty('id');
  });

  it('Should be able to create user', async () => {
    const user = userMock();
    userRepositoryMock.createUser.mockReturnValue(user);
    const createdUser = await createUserRepository.createUser(user);
    const spy = jest.spyOn(createUserRepository, 'createUser');
    expect(spy).toHaveBeenCalled();
    expect(createdUser).toHaveProperty('id');
  });

  it('Should be able to delete user by id', async () => {
    const user = userMock();
    await deleteUserRepository.deleteUserById(user.id);
    const spy = jest.spyOn(deleteUserRepository, 'deleteUserById');
    expect(spy).toHaveBeenCalled();
  });

  it('Should be able to update user', async () => {
    const user = userMock();
    const baseUpdatedUser = userMock();
    userRepositoryMock.updateUser.mockReturnValue(baseUpdatedUser);
    const updatedUser = await updateUserRepository.updateUser(
      user.id,
      baseUpdatedUser,
    );
    const spy = jest.spyOn(updateUserRepository, 'updateUser');
    expect(spy).toHaveBeenCalled();
    expect(updatedUser).toEqual(baseUpdatedUser);
  });
});
