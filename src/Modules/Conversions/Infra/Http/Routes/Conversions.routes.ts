import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import AuthController from 'Shared/Containers/AuthProvider/Controllers/AuthController';
import ConversionsController from '../Controllers/ConversionsController';

const conversionsRoutes = Router();
const authController = new AuthController();
const conversionsController = new ConversionsController();

conversionsRoutes.use(authController.on);
conversionsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      from_wallet_id: Joi.string().uuid().required(),
      to_wallet_id: Joi.string().uuid().required(),
      percentual_rate: Joi.number().positive(),
      static_rate: Joi.number().positive(),
    },
  }),
  conversionsController.create,
);

export default conversionsRoutes;
