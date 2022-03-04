import {
  CreateUserController,
  DeleteUserController,
  ListUsersController,
  UpdateUserController,
  ListUsersAuthenticatedController,
} from '../../presentation/controllers';

export const composeControllersFactory = () => {
  return [
    ListUsersController,
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
    ListUsersAuthenticatedController,
  ];
};
