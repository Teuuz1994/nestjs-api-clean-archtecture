import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';

import { IdGenerator } from '@/modules/users/data/protocols';

@Injectable()
export class GenerateUuidAdapter implements IdGenerator {
  generate(): string {
    return randomUUID();
  }
}
