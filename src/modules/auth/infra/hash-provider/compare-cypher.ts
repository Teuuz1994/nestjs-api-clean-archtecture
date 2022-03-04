import { compare } from 'bcryptjs';

import { CompareHashProvider } from '../../data/protocols';

export class CypherCompare implements CompareHashProvider {
  async compareCypher(
    originalContent: string,
    cypherContent: string,
  ): Promise<boolean> {
    return compare(originalContent, cypherContent);
  }
}
