import {
  CreateUserController,
  DeleteUserController,
  ListUsersController,
  UpdateUserController,
} from '../../presentation/controllers';

export const composeControllersFactory = () => {
  return [
    ListUsersController,
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
  ];
};
