import * as faker from 'faker';

import { User } from '@/modules/users/infra/typeorm/entities/user';
import { GenerateUuidAdapter } from '../../../generator/id-generator';

export const userMock = (): User => {
  const userInstance = new User();
  userInstance.id = GenerateUuidAdapter.generate();
  userInstance.name = `${faker.name.findName()} ${faker.name.lastName()}`;
  userInstance.email = faker.internet.email();
  userInstance.password = faker.internet.password();
  userInstance.createdAt = new Date();
  userInstance.updatedAt = new Date();
  return userInstance;
};
