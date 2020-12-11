import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../Controllers/UsersController';
import SessionsController from '../Controllers/SessionsController';

const usersRoutes = Router();

const usersController = new UsersController();
const sessionsController = new SessionsController();

usersRoutes.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  usersController.create,
);

usersRoutes.post(
  '/signin',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  sessionsController.create,
);

export default usersRoutes;
