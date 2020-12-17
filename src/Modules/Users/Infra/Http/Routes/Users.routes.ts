import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AuthController from 'Shared/Containers/AuthProvider/Controllers/AuthController';
import UsersController from '../Controllers/UsersController';
import SessionsController from '../Controllers/SessionsController';

const usersRoutes = Router();

const authController = new AuthController();
const usersController = new UsersController();
const sessionsController = new SessionsController();

// Public routes
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

// Private routes
usersRoutes.use(authController.on);
usersRoutes.delete('/signout', sessionsController.delete);

export default usersRoutes;
