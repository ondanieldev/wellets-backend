interface ICacheProvider {
  save<T>(key: string, value: T, expires?: number): Promise<void>;
  find<T>(key: string): Promise<T>;
  delete(key: string): Promise<void>;
  deleteByPrefix(prefix: string): Promise<void>;
}

export default ICacheProvider;
