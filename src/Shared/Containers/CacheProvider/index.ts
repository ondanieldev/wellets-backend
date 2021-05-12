import { container } from 'tsyringe';

import ICacheProvider from './Models/ICacheProvider';
import RedisCacheProvider from './Implementations/RedisCacheProvider';

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  RedisCacheProvider,
);
