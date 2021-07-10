import { Router } from 'express';

import currenciesRoutes from './Currencies.routes';
import customCurrenciesRoutes from './CustomCurrencies.routes';
import currencyRatesRoutes from './CurrencyRates.routes';

const routes = Router();

routes.use('/custom', customCurrenciesRoutes);
routes.use('/rates', currencyRatesRoutes);
routes.use('/', currenciesRoutes);

export default routes;
