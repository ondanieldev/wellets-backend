import { injectable, inject, container } from 'tsyringe';

import IHashProvider from 'Shared/Containers/HashProvider/Models/IHashProvider';
import AppError from 'Shared/Errors/AppError';
import User from '../Infra/TypeORM/Entities/User';
import ICreateUserDTO from '../DTOs/ICreateUserDTO';
import IUsersRepository from '../Repositories/IUsersRepository';
import CreateUserSettingsService from './CreateUserSettingsService';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: ICreateUserDTO): Promise<User> {
    const parsedEmail = email.toLowerCase();

    const userExists = await this.usersRepository.findByEmail(parsedEmail);

    if (userExists) {
      throw new AppError('This email is already in use!', 401);
    }

    const hashedPassword = await this.hashProvider.encrypt(password);

    const user = await this.usersRepository.create({
      email: parsedEmail,
      password: hashedPassword,
    });

    const createUserSettings = container.resolve(CreateUserSettingsService);
    await createUserSettings.execute({ user_id: user.id });

    return user;
  }
}

export default CreateUserService;
