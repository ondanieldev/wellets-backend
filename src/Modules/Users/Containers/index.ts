import { container } from 'tsyringe';

import IUsersRepository from '../Repositories/IUsersRepository';
import IUserSettingsRepository from '../Repositories/IUserSettingsRepository';

import UsersRepository from '../Infra/TypeORM/Repositories/UsersRepository';
import UserSettingsRepository from '../Infra/TypeORM/Repositories/UserSettingsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserSettingsRepository>(
  'UserSettingsRepository',
  UserSettingsRepository,
);
