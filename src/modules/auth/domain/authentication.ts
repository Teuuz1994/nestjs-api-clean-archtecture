import { UserCredentialsDTO } from '../dto/user-credentials-dto';
import { AuthenticationModel } from './models/authentication-model';

export interface Authentication {
  execute(credentials: UserCredentialsDTO): Promise<AuthenticationModel>;
}
