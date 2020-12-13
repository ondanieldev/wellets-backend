import ICurrenciesRatesDTO from '../DTOs/ICurrenciesRatesDTO';

interface IRatesProvider {
  getLatestRates(): Promise<ICurrenciesRatesDTO>;
}

export default IRatesProvider;
