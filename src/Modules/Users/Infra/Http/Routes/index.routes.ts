import { Router } from 'express';

import sessionsRoutes from './Sessions.routes';
import usersRoutes from './Users.routes';

const routes = Router();

routes.use('/sessions', sessionsRoutes);
routes.use('/', usersRoutes);

export default routes;
