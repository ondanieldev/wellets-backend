import { inject, injectable } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import Currency from '../Infra/TypeORM/Entities/Currency';
import ICurrenciesRepository from '../Repositories/ICurrenciesRepository';
import IUpdateCurrencyDTO from '../DTOs/IUpdateCurrencyDTO';

@injectable()
class UpdateCustomCurrencyService {
  constructor(
    @inject('CurrenciesRepository')
    private currenciesRepository: ICurrenciesRepository,
  ) {}

  public async execute({ id, ...data }: IUpdateCurrencyDTO): Promise<Currency> {
    const currency = await this.currenciesRepository.findById(id);

    if (!currency) {
      throw new AppError('This currency does not exist!', 404);
    }

    if (currency.user_id !== data.user_id) {
      throw new AppError(
        'You does not have permission to manage this currency!',
        403,
      );
    }

    if (data.acronym !== currency.acronym) {
      const acronymInUse = await this.currenciesRepository.findByAcronym(
        data.acronym,
      );

      if (acronymInUse) {
        throw new AppError('This acronym is already in use!');
      }
    }

    Object.assign(currency, data);
    await this.currenciesRepository.save(currency);

    return currency;
  }
}

export default UpdateCustomCurrencyService;
