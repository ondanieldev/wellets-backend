import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import AuthController from 'Shared/Containers/AuthProvider/Controllers/AuthController';
import TransactionsController from '../Controllers/TransactionsController';

const transactionsRouter = Router();
const authController = new AuthController();
const transactionsController = new TransactionsController();

transactionsRouter.use(authController.on);
transactionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      wallet_id: Joi.string().uuid().required(),
      value: Joi.number().required(),
      description: Joi.string().required(),
    },
  }),
  transactionsController.create,
);

export default transactionsRouter;
