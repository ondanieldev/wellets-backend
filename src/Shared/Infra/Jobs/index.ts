import CurrenciesJob from 'Modules/Currencies/Infra/Jobs/CurrenciesJob';

class Jobs {
  public run(): void {
    const currenciesJob = new CurrenciesJob();

    currenciesJob.update();
  }
}

export default Jobs;
