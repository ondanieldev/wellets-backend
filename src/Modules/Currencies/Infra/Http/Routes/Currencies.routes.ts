import { Router } from 'express';

import AuthController from 'Shared/Containers/AuthProvider/Controllers/AuthController';
import CurrenciesController from '../Controllers/CurrenciesController';

const currenciesRoutes = Router();
const authController = new AuthController();
const currenciesController = new CurrenciesController();

// Private routes
currenciesRoutes.use(authController.on);
currenciesRoutes.get('/', currenciesController.index);

export default currenciesRoutes;
