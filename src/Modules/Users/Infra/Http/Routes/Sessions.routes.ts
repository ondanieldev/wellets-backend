import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AuthController from 'Shared/Containers/AuthProvider/Controllers/AuthController';
import SessionsController from '../Controllers/SessionsController';

const usersRoutes = Router();

const authController = new AuthController();
const sessionsController = new SessionsController();

// Public routes
usersRoutes.post(
  '/',
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
usersRoutes.delete('/', sessionsController.delete);

export default usersRoutes;
