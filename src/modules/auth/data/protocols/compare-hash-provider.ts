export interface CompareHashProvider {
  compareCypher(
    originalContent: string,
    cypherContent: string,
  ): Promise<boolean>;
}
