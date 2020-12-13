import { Router } from 'express';

import usersRoutes from 'Modules/Users/Infra/Http/Routes/Users.routes';
import currenciesRoutes from 'Modules/Currencies/Infra/Http/Routes/Currencies.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/currencies', currenciesRoutes);

export default routes;
