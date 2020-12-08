import { injectable, inject } from 'tsyringe';

import User from '../Infra/TypeORM/Entities/User';
import ICreateUserDTO from '../DTOs/ICreateUserDTO';
import IUsersRepository from '../Repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: ICreateUserDTO): Promise<User> {
    const user = await this.usersRepository.create({ email, password });

    return user;
  }
}

export default CreateUserService;
