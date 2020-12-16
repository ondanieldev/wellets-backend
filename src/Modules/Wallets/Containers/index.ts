import { container } from 'tsyringe';

import IWalletsRepository from '../Repositories/IWalletsRepository';
import WalletsRepository from '../Infra/TypeORM/Repositories/WalletsRepository';

container.registerSingleton<IWalletsRepository>(
  'WalletsRepository',
  WalletsRepository,
);
