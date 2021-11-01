import { injectable, inject, container } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import IHashProvider from 'Shared/Containers/HashProvider/Models/IHashProvider';
import IAuthProvider from 'Shared/Containers/AuthProvider/Models/IAuthProvider';
import User from '../Infra/TypeORM/Entities/User';
import ICreateUserDTO from '../DTOs/ICreateUserDTO';
import IUsersRepository from '../Repositories/IUsersRepository';
import CreateUserSettingsService from './CreateUserSettingsService';

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('AuthProvider')
    private authProvider: IAuthProvider,
  ) {}

  public async execute({ email, password }: ICreateUserDTO): Promise<User> {
    const parsedEmail = email.toLowerCase();

    const user = await this.usersRepository.findByEmail(parsedEmail);

    if (!user) {
      throw new AppError('Invalid email and password combination!', 401);
    }

    const passwordMatch = await this.hashProvider.compare(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AppError('Invalid email and password combination!', 401);
    }

    const token = await this.authProvider.generateToken(user);

    Object.assign(user, { token });

    await this.usersRepository.save(user);

    const createUserSettings = container.resolve(CreateUserSettingsService);
    await createUserSettings.execute({ user_id: user.id });

    return user;
  }
}

export default AuthenticateUserService;
