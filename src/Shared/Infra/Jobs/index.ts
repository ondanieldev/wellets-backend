import CurrenciesJob from 'Modules/Currencies/Infra/Jobs/CurrenciesJob';

class Jobs {
  private currenciesJob = new CurrenciesJob();

  public run(): void {
    this.currenciesJob.update();
  }

  public once(): void {
    this.currenciesJob.once();
  }
}

export default Jobs;
