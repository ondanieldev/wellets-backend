import { inject, injectable } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import IAuthProvider from 'Shared/Containers/AuthProvider/Models/IAuthProvider';
import IUsersRepository from 'Modules/Users/Repositories/IUsersRepository';

@injectable()
class AuthService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AuthProvider')
    private authProvider: IAuthProvider,
  ) {}

  public async execute(authorization: string): Promise<User> {
    if (!authorization) {
      throw new AppError('Missing authorization header!', 401);
    }

    const [, token] = authorization.split(' ');

    if (!token) {
      throw new AppError('Missing token!', 401);
    }

    const payload = await this.authProvider.decodeToken(token);

    const { sub } = payload;

    const user = await this.usersRepository.findById(sub);

    if (!user || user.token !== token) {
      throw new AppError('Invalid JWT token!', 401);
    }

    return user;
  }
}

export default AuthService;
