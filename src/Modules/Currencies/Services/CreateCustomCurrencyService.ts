import { injectable, inject } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import ICreateCurrencyDTO from '../DTOs/ICreateCurrencyDTO';
import Currency from '../Infra/TypeORM/Entities/Currency';

import ICurrenciesRepository from '../Repositories/ICurrenciesRepository';

@injectable()
class CreateCustomCurrencyService {
  constructor(
    @inject('CurrenciesRepository')
    private currenciesRepository: ICurrenciesRepository,
  ) {}

  public async execute(data: ICreateCurrencyDTO): Promise<Currency> {
    const exists = await this.currenciesRepository.findByAcronymAndUser(
      data.acronym,
      data.user_id,
    );

    if (exists) {
      throw new AppError(
        'You have already created a currency with this acronym!',
      );
    }

    return this.currenciesRepository.create(data);
  }
}

export default CreateCustomCurrencyService;
