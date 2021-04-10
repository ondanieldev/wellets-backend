import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';
import '../../Containers';

import express from 'express';
import { errors as celebrateErrors } from 'celebrate';
import cors from 'cors';

import log from '../../Helpers/log';
import TypeORM from '../TypeORM';
import Jobs from '../Jobs';
// import Bots from '../Bots';
import routes from './Routes/index.routes';
import HandleErrors from './Middlewares/HandleErrors';

const app = express();
const port = process.env.APP_PORT || 3333;
const typeORM = new TypeORM();
const jobs = new Jobs();
// const bots = new Bots();
const handleErrors = new HandleErrors();

typeORM.run().then(() => {
  jobs.run();
  app.use(cors());
  app.use(express.json());
  app.use(routes);
  app.use(celebrateErrors());
  app.use(handleErrors.on);
  // bots.run();
});

app.listen(port, () => {
  log(`Server Running On Port ${port}`, 'yellow');
});
