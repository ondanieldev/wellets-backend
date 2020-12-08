import { Router } from 'express';

import UsersController from '../Controllers/UsersController';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/signup', usersController.create);

export default usersRoutes;
