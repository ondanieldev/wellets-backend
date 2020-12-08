import 'dotenv/config';

import express from 'express';

import '../../Containers';

import TypeORM from '../TypeORM';

const app = express();
const port = process.env.APP_PORT || 3333;
const typeORM = new TypeORM();

typeORM.run();

app.listen(port, () => {
  console.log(`\x1b[33mServer Running On Port ${port}\x1b[0m`);
});
