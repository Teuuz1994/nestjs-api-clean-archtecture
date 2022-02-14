export abstract class DbDeleteUser {
  abstract execute(id: string): Promise<void>;
}
