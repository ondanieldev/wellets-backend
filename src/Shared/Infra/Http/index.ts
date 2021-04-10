import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';
import '../../Containers';

import express from 'express';
import cors from 'cors';
import { errors as celebrateErrors } from 'celebrate';

import log from '../../Helpers/log';
import TypeORM from '../TypeORM';
import Jobs from '../Jobs';
import routes from './Routes/index.routes';
import HandleErrors from './Middlewares/HandleErrors';

const app = express();
const port = process.env.APP_PORT || 3333;
const typeORM = new TypeORM();
const jobs = new Jobs();
const handleErrors = new HandleErrors();

typeORM.run().then(() => {
  jobs.run();
});

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(celebrateErrors());
app.use(handleErrors.on);

app.listen(port, () => {
  log(`Server Running On Port ${port}`, 'yellow');
});
