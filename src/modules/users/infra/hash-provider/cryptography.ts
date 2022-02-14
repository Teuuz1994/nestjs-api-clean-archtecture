import { hash } from 'bcryptjs';

import { HashProvider } from '@/modules/users/data/protocols';

export class HashAdapter implements HashProvider {
  async cypher(content: string): Promise<string> {
    return hash(content, 12);
  }
}
