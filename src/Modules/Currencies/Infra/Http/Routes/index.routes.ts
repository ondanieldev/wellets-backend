import { Router } from 'express';

import currenciesRoutes from './Currencies.routes';
import customCurrenciesRoutes from './CustomCurrencies.routes';

const routes = Router();

routes.use('/custom', customCurrenciesRoutes);
routes.use('/', currenciesRoutes);

export default routes;
