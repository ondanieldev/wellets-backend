import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import AuthController from 'Shared/Containers/AuthProvider/Controllers/AuthController';
import CustomCurrenciesController from '../Controllers/CustomCurrenciesController';

const customCurrenciesRoutes = Router();
const authController = new AuthController();
const customCurrenciesController = new CustomCurrenciesController();

// Private routes
customCurrenciesRoutes.use(authController.on);
customCurrenciesRoutes.get('/', customCurrenciesController.index);
customCurrenciesRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      acronym: Joi.string().max(4).required(),
      alias: Joi.string().required(),
      dollar_rate: Joi.number().positive().required(),
      format: Joi.string().required(),
    },
  }),
  customCurrenciesController.create,
);
customCurrenciesRoutes.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      acronym: Joi.string().max(4).required(),
      alias: Joi.string().required(),
      dollar_rate: Joi.number().positive().required(),
      format: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customCurrenciesController.update,
);
customCurrenciesRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customCurrenciesController.delete,
);

export default customCurrenciesRoutes;
