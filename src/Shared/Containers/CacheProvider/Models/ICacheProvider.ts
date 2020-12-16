interface ICacheProvider {
  save<T>(key: string, value: T): Promise<void>;
  find<T>(key: string): Promise<T>;
  delete(key: string): Promise<void>;
}

export default ICacheProvider;
