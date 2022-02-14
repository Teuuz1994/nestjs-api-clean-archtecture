export interface HashProvider {
  cypher(content: string): Promise<string>;
}
