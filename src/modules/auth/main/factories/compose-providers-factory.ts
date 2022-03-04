import { Provider } from '@nestjs/common';

import { AUTH_TOKEN_INJECTION } from '@/modules/auth/infra/tokens/auth-token-injection';
import { CypherCompare } from '@/modules/auth/infra/hash-provider/compare-cypher';
import {
  CheckUserCredentialsService,
  JwtStrategy,
  RemoteAuthentication,
} from '../../data/use-cases';

export const composeProvidersFactory = (): Provider[] => [
  JwtStrategy,
  {
    provide: AUTH_TOKEN_INJECTION.COMPARE_HASH,
    useClass: CypherCompare,
  },
  {
    provide: AUTH_TOKEN_INJECTION.CHECK_USER_CREDENTIALS,
    useClass: CheckUserCredentialsService,
  },
  {
    provide: AUTH_TOKEN_INJECTION.REMOTE_AUTHENTICATION,
    useClass: RemoteAuthentication,
  },
];
