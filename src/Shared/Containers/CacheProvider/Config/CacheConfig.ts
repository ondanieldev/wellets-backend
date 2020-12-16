interface ICacheConfig {
  driver: 'redis';
  redis: {
    port: number;
    password: string;
  };
}

export default {
  driver: process.env.CACHE_DRIVER,
  redis: {
    port: Number(process.env.CACHE_REDIS_PORT),
    password: process.env.CACHE_REDIS_PASSWORD,
  },
} as ICacheConfig;
