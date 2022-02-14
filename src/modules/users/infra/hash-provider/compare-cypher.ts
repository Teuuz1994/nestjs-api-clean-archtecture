import { compare } from 'bcryptjs';

export class CypherCompare {
  async compareCypher(
    originalContent: string,
    cypherContent: string,
  ): Promise<boolean> {
    return compare(originalContent, cypherContent);
  }
}
