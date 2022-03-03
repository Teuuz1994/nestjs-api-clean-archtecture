import { randomUUID } from 'crypto';

export class GenerateUuidAdapter {
  static generate(): string {
    return randomUUID();
  }
}
