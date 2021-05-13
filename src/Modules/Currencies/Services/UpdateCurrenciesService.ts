import { injectable, inject } from 'tsyringe';

import log from 'Shared/Helpers/log';
import IRatesProvider from 'Shared/Containers/RatesProvider/Models/IRatesProvider';
import ICurrenciesRepository from '../Repositories/ICurrenciesRepository';

@injectable()
class UpdateCurrenciesService {
  constructor(
    @inject('CurrenciesRepository')
    private currenciesRepository: ICurrenciesRepository,

    @inject('RatesProvider')
    private ratesProvider: IRatesProvider,
  ) {}

  public async execute(): Promise<void> {
    const latestCurrenciesRates = await this.ratesProvider.getLatestRates();

    Object.entries(latestCurrenciesRates).forEach(async ([acronym, rate]) => {
      const currency = await this.currenciesRepository.findByAcronymAndNoUser(
        acronym,
      );

      if (currency) {
        currency.dollar_rate = rate;

        await this.currenciesRepository.save(currency);
      }
    });

    log('Currencies rates updated *-*', 'blue');
  }
}

export default UpdateCurrenciesService;
