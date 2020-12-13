import { MigrationInterface, QueryRunner } from 'typeorm';
import path from 'path';
import fs from 'fs';

import ICurrenciesFromDocumentDTO from 'Modules/Currencies/DTOs/ICurrenciesFromDocumentDTO';

export default class CreateCurrencies1607882998147
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const currenciesDir = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'Modules',
      'Currencies',
      'Data',
      'Currencies.json',
    );

    const currenciesJSON = fs.readFileSync(currenciesDir, {
      encoding: 'utf-8',
    });

    const currencies = JSON.parse(currenciesJSON) as ICurrenciesFromDocumentDTO;

    const promises = [] as Promise<any>[];

    Object.values(currencies).forEach(
      ({ code, name, format, exchange_rate }) => {
        const insert = queryRunner.query(
          `INSERT INTO currencies(acronym, alias, dollar_rate, format) VALUES($1, $2, $3, $4)`,
          [code, name, exchange_rate, format],
        );

        promises.push(insert);
      },
    );

    await Promise.all(promises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM currencies');
  }
}
