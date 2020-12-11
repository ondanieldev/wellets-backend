import { container } from 'tsyringe';

import IUsersRepository from '../Repositories/IUsersRepository';
import UsersRepository from '../Infra/TypeORM/Repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
