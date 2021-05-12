import User from 'Modules/Users/Infra/TypeORM/Entities/User';

declare global {
  declare namespace Express {
    interface Request {
      user: User;
    }
  }
}
