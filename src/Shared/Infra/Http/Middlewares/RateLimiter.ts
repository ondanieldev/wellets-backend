import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';

import AppError from 'Shared/Errors/AppError';
import CacheConfig from 'Shared/Containers/CacheProvider/Config/CacheConfig';

class RateLimiter {
  public async on(
    request: Request,
    _response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const redisClient = new Redis({
        host: CacheConfig.redis.host,
        port: CacheConfig.redis.port,
        password: CacheConfig.redis.password || undefined,
      });

      const rateLimiterRedis = new RateLimiterRedis({
        storeClient: redisClient,
        points: 15,
        duration: 1,
        keyPrefix: 'rlflx',
      });

      await rateLimiterRedis.consume(request.ip);
      return next();
    } catch (err) {
      throw new AppError('Too many requests!', 429);
    }
  }
}

export default RateLimiter;
