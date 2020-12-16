interface ICacheConfig {
  driver: 'redis';
  redis: {
    port: number;
  };
}

export default {
  driver: process.env.CACHE_DRIVER,
  redis: {
    port: Number(process.env.CACHE_REDIS_PORT),
  },
} as ICacheConfig;
