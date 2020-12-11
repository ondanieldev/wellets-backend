interface IHashProvider {
  encrypt(payload: string): Promise<string>;
  compare(payload: string, hash: string): Promise<boolean>;
}

export default IHashProvider;
