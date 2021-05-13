import { injectable, inject } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import ICreateCurrencyDTO from '../DTOs/ICreateCurrencyDTO';
import Currency from '../Infra/TypeORM/Entities/Currency';

import ICurrenciesRepository from '../Repositories/ICurrenciesRepository';

interface IRequest extends ICreateCurrencyDTO {
  user_id: string;
}

@injectable()
class CreateCustomCurrencyService {
  constructor(
    @inject('CurrenciesRepository')
    private currenciesRepository: ICurrenciesRepository,
  ) {}

  public async execute(data: IRequest): Promise<Currency> {
    const exists = await this.currenciesRepository.findByAcronym(
      data.acronym,
      data.user_id,
    );

    if (exists) {
      throw new AppError('This acronym is already in use!');
    }

    return this.currenciesRepository.create(data);
  }
}

export default CreateCustomCurrencyService;
