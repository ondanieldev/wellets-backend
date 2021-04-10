import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../Controllers/UsersController';

const usersRoutes = Router();

const usersController = new UsersController();

// Public routes
usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  usersController.create,
);

export default usersRoutes;
