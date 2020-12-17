import { Router } from 'express';

import AuthController from 'Shared/Containers/AuthProvider/Controllers/AuthController';
import CurrenciesController from '../Controllers/CurrenciesController';

const currenciesRoutes = Router();

const authController = new AuthController();
const currenciesController = new CurrenciesController();

currenciesRoutes.use(authController.on);
currenciesRoutes.post('/', authController.on, currenciesController.create);
currenciesRoutes.patch('/', authController.on, currenciesController.update);

export default currenciesRoutes;
