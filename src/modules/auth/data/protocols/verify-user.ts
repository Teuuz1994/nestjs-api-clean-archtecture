import { UserModel } from '@/modules/users/domain/models/UserModel';

export interface CheckUserCredentials {
  execute(email: string, password: string): Promise<UserModel>;
}
