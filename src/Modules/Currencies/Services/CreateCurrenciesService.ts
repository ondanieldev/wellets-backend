import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';

import Currency from '../Infra/TypeORM/Entities/Currency';
import ICurrenciesFromDocumentDTO from '../DTOs/ICurrenciesFromDocumentDTO';
import ICurrenciesRepository from '../Repositories/ICurrenciesRepository';

@injectable()
class CreateCurrenciesService {
  constructor(
    @inject('CurrenciesRepository')
    private currenciesRepository: ICurrenciesRepository,
  ) {}

  public async execute(): Promise<void> {
    const currenciesDir = path.resolve(
      __dirname,
      '..',
      'Data',
      'Currencies.json',
    );

    const currenciesJSON = fs.readFileSync(currenciesDir, {
      encoding: 'utf-8',
    });

    const currencies = JSON.parse(currenciesJSON) as ICurrenciesFromDocumentDTO;

    const createCurrencies = [] as Promise<Currency>[];

    Object.values(currencies).forEach(
      ({ code, name, format, exchange_rate }) => {
        const createCurrency = this.currenciesRepository.create({
          acronym: code,
          alias: name,
          dollar_rate: exchange_rate,
          format,
        });

        createCurrencies.push(createCurrency);
      },
    );

    await Promise.all(createCurrencies);
  }
}

export default CreateCurrenciesService;
