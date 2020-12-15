import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AuthController from 'Shared/Containers/AuthProvider/Controllers/AuthController';
import WalletsController from '../Controllers/WalletsController';

const walletsRoutes = Router();
const authController = new AuthController();
const walletsController = new WalletsController();

walletsRoutes.post(
  '/',
  authController.on,
  celebrate({
    [Segments.BODY]: {
      alias: Joi.string().required(),
      currency_id: Joi.string().uuid().required(),
      balance: Joi.number().positive(),
    },
  }),
  walletsController.create,
);

export default walletsRoutes;
