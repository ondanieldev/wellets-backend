import { EntityRepository, Repository, getRepository } from 'typeorm';

import User from '../Entities/User';
import IUsersRepository from '../../../Repositories/IUsersRepository';
import ICreateUserDTO from '../../../DTOs/ICreateUserDTO';

@EntityRepository(User)
class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }
}

export default UsersRepository;
