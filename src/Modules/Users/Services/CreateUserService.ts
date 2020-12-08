import { injectable, inject } from 'tsyringe';

import ICreateUserDTO from '../DTOs/ICreateUserDTO';
import IUsersRepository from '../Repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create({ email, password });
  }
}

export default CreateUserService;
