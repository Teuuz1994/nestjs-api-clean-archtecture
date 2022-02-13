import { hash } from 'bcryptjs';

export class HashAdapter {
  async cypher(content: string): Promise<string> {
    return hash(content, 12);
  }
}
