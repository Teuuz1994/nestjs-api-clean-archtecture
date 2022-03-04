import { Provider } from '@nestjs/common';

import { AUTH_TOKEN_INJECTION } from '@/modules/auth/infra/tokens/auth-token-injection';
import { CypherCompare } from '@/modules/auth/infra/hash-provider/compare-cypher';
import { JwtAuthGuard } from '../../infra/auth-guard/jwt-auth-guard';
import {
  CheckUserCredentialsService,
  JwtStrategy,
  RemoteAuthentication,
} from '../../data/use-cases';

export const composeProvidersFactory = (): Provider[] => [
  JwtStrategy,
  JwtAuthGuard,
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
