import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AuthController from 'Shared/Containers/AuthProvider/Controllers/AuthController';
import WalletsController from '../Controllers/WalletsController';
import WalletsTotalBalanceController from '../Controllers/WalletsTotalBalanceController';

const walletsRoutes = Router();
const authController = new AuthController();
const walletsController = new WalletsController();
const walletsTotalBalanceController = new WalletsTotalBalanceController();

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
walletsRoutes.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      limit: Joi.number().positive().max(25).required(),
      page: Joi.number().positive().required(),
    },
  }),
  walletsController.index,
);
walletsRoutes.delete(
  '/:wallet_id',
  celebrate({
    [Segments.PARAMS]: {
      wallet_id: Joi.string().uuid().required(),
    },
  }),
  walletsController.delete,
);
walletsRoutes.get(
  '/total-balance',
  celebrate({
    [Segments.QUERY]: {
      base_currency_id: Joi.string().uuid().required(),
    },
  }),
  walletsTotalBalanceController.show,
);

export default walletsRoutes;
