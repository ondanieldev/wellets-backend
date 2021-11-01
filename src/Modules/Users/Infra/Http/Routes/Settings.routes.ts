import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import AuthController from 'Shared/Containers/AuthProvider/Controllers/AuthController';
import UserSettingsController from '../Controllers/UserSettingsController';

const routes = Router();
const authController = new AuthController();
const userSettingsController = new UserSettingsController();

routes.use(authController.on);
routes.get('/', userSettingsController.show);
routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      currency_id: Joi.string().uuid(),
    },
  }),
  userSettingsController.create,
);
routes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      currency_id: Joi.string().uuid().required(),
    },
  }),
  userSettingsController.update,
);

export default routes;
