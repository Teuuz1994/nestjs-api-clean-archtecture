export abstract class CompareHashProvider {
  abstract compareCypher(
    originalContent: string,
    cypherContent: string,
  ): Promise<boolean>;
}
