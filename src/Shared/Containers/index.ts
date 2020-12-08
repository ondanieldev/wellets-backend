import { container } from 'tsyringe';

import IUsersRepository from 'Modules/Users/Repositories/IUsersRepository';
import UsersRepository from 'Modules/Users/Infra/TypeORM/Repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
