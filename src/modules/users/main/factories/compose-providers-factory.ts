import {
  CreateUserUseCase,
  DeleteUserUseCase,
  LIstAllUsersUserCase,
  UpdateUserUseCase,
} from '../../data/use-cases';
import { HashAdapter } from '../../infra/hash-provider';
import { TOKEN_INJECTION } from '../../infra/tokens/token-injection';

export const composeProvidersFactory = () => {
  return [
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
      provide: TOKEN_INJECTION.DB_DELETE_USER,
      useClass: DeleteUserUseCase,
    },
  ];
};
