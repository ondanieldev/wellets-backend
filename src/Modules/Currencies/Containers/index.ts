import { container } from 'tsyringe';

import ICurrenciesRepository from '../Repositories/ICurrenciesRepository';
import CurrenciesRepository from '../Infra/TypeORM/Repositories/CurrenciesRepository';

container.registerSingleton<ICurrenciesRepository>(
  'CurrenciesRepository',
  CurrenciesRepository,
);
