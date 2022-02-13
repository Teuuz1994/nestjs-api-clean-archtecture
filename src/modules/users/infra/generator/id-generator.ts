import { randomUUID } from 'crypto';

export class GenerateUuidAdapter {
  generate(): string {
    return randomUUID();
  }
}
