import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import AuthController from 'Shared/Containers/AuthProvider/Controllers/AuthController';
import TransfersController from '../Controllers/TransfersController';

const transfersRoutes = Router();
const authController = new AuthController();
const transfersController = new TransfersController();

transfersRoutes.use(authController.on);
transfersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      from_wallet_id: Joi.string().uuid().required(),
      to_wallet_id: Joi.string().uuid().required(),
      percentual_fee: Joi.number().min(0),
      static_fee: Joi.number().min(0),
      value: Joi.number().positive().required(),
    },
  }),
  transfersController.create,
);
transfersRoutes.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      wallet_id: Joi.string().uuid().required(),
      limit: Joi.number().positive().max(25).required(),
      page: Joi.number().positive().required(),
    },
  }),
  transfersController.index,
);

export default transfersRoutes;
