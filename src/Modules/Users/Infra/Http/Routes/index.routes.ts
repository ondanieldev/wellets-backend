import { Router } from 'express';

import sessionsRoutes from './Sessions.routes';
import settingsRoutes from './Settings.routes';
import usersRoutes from './Users.routes';

const routes = Router();

routes.use('/sessions', sessionsRoutes);
routes.use('/settings', settingsRoutes);
routes.use('/', usersRoutes);

export default routes;
