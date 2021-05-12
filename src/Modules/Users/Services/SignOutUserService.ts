import { injectable, inject } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import IUsersRepository from '../Repositories/IUsersRepository';

@injectable()
class LogoutUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('You was not found on our database!', 404);
    }

    user.token = null;

    await this.usersRepository.save(user);
  }
}

export default LogoutUserService;
