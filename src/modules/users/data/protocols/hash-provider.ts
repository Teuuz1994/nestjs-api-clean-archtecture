export abstract class HashProvider {
  abstract cypher(content: string): Promise<string>;
}
