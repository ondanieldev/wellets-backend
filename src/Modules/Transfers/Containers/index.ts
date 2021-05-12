import { container } from 'tsyringe';

import ITransfersRepository from '../Repositories/ITransfersRepository';
import TransfersRepository from '../Infra/TypeORM/Repositories/TransfersRepository';

container.registerSingleton<ITransfersRepository>(
  'TransfersRepository',
  TransfersRepository,
);
