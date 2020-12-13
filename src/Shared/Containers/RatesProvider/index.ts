import { container } from 'tsyringe';

import RatesConfig from './Config/RatesConfig';
import IRatesProvider from './Models/IRatesProvider';
import OpenExchangeRatesProvider from './Implementations/OpenExchangeRatesProvider';

const drivers = {
  openexchange: OpenExchangeRatesProvider,
};

container.registerSingleton<IRatesProvider>(
  'RatesProvider',
  drivers[RatesConfig.driver],
);
