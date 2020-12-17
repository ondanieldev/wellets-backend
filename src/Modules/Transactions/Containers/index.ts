import { container } from 'tsyringe';

import ITransactionsRepository from '../Repositories/ITransactionsRepository';
import TransactionsRepository from '../Infra/TypeORM/Repositories/TransactionsRepository';

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);
