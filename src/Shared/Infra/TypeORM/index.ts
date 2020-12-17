import { createConnection } from 'typeorm';

import log from '../../Helpers/log';

class TypeORM {
  public async run(): Promise<void> {
    try {
      await createConnection();
      log('PostgresSQL Connected :)', 'green');
    } catch {
      log('PostgresSQL Not Connected ;-;', 'red');
    }
  }
}

export default TypeORM;
