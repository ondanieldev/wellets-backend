import cron from 'node-cron';
import { container } from 'tsyringe';

import UpdateCurrenciesService from '../../Services/UpdateCurrenciesService';

class CurrenciesJob {
  public update(): void {
    const updateCurrencies = container.resolve(UpdateCurrenciesService);

    const updateJob = cron.schedule('*/59 * * * *', () => {
      updateCurrencies.execute();
    });

    updateJob.start();
  }
}

export default CurrenciesJob;
