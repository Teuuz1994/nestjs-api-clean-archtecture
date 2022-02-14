export interface DbDeleteUser {
  execute(id: string): Promise<void>;
}
