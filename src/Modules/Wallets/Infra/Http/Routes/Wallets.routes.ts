import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AuthController from 'Shared/Containers/AuthProvider/Controllers/AuthController';
import WalletsController from '../Controllers/WalletsController';

const walletsRoutes = Router();
const authController = new AuthController();
const walletsController = new WalletsController();

walletsRoutes.use(authController.on);
walletsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      alias: Joi.string().required(),
      currency_id: Joi.string().uuid().required(),
      balance: Joi.number().min(0),
    },
  }),
  walletsController.create,
);
walletsRoutes.get('/', walletsController.index);
walletsRoutes.delete(
  '/:wallet_id',
  celebrate({
    [Segments.PARAMS]: {
      wallet_id: Joi.string().required(),
    },
  }),
  walletsController.delete,
);

export default walletsRoutes;
