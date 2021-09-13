import { container } from 'tsyringe';

import ICurrencyPreferencesRepository from '../Repositories/ICurrencyPreferencesRepository';
import CurrencyPreferencesRepository from '../Infra/TypeORM/Repositories/CurrencyPreferencesRepository';

container.registerSingleton<ICurrencyPreferencesRepository>(
  'CurrencyPreferencesRepository',
  CurrencyPreferencesRepository,
);
