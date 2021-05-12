import { Router } from 'express';

import CurrenciesController from '../Controllers/CurrenciesController';

const currenciesRoutes = Router();

const currenciesController = new CurrenciesController();

// Public routes
currenciesRoutes.get('/', currenciesController.index);

export default currenciesRoutes;
