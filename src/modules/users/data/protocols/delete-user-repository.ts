export interface DeleteUserRepository {
  deleteUserById(id: string): Promise<void>;
}
