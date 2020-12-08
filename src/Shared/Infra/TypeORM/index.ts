import { createConnection } from 'typeorm';

class TypeORM {
  public async run(): Promise<void> {
    try {
      await createConnection();
      console.log('\x1b[32mPostgresSQL Connected :)\x1b[0m');
    } catch {
      console.log('\x1b[31mPostgresSQL Not Connected ;-;\x1b[0m');
    }
  }
}

export default TypeORM;
