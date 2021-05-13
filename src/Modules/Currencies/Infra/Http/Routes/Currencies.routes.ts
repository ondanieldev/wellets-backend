import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import AuthController from 'Shared/Containers/AuthProvider/Controllers/AuthController';
import CurrenciesController from '../Controllers/CurrenciesController';

const currenciesRoutes = Router();
const authController = new AuthController();
const currenciesController = new CurrenciesController();

// Private routes
currenciesRoutes.use(authController.on);
currenciesRoutes.get('/', currenciesController.index);
currenciesRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      acronym: Joi.string().max(4).required(),
      alias: Joi.string().required(),
      dollar_rate: Joi.number().required(),
      format: Joi.string().required(),
    },
  }),
  currenciesController.create,
);
currenciesRoutes.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      acronym: Joi.string().max(4).required(),
      alias: Joi.string().required(),
      dollar_rate: Joi.number().required(),
      format: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  currenciesController.update,
);

export default currenciesRoutes;
