import { injectable, inject } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import IUpsertCurrencyPreferenceDTO from '../DTOs/IUpsertCurrencyPreferenceDTO';
import CurrencyPreference from '../Infra/TypeORM/Entities/CurrencyPreference';
import ICurrencyPreferencesRepository from '../Repositories/ICurrencyPreferencesRepository';

@injectable()
class CreateCurrencyPreferenceService {
  constructor(
    @inject('CurrencyPreferencesRepository')
    private currencyPreferencesRepository: ICurrencyPreferencesRepository,
  ) {}

  public async execute(
    data: IUpsertCurrencyPreferenceDTO,
  ): Promise<CurrencyPreference> {
    const exists = await this.currencyPreferencesRepository.find(
      data.user_id,
      data.currency_id,
    );

    if (exists) {
      throw new AppError('Cannot create another preference on this currency!');
    }

    return this.currencyPreferencesRepository.create(data);
  }
}

export default CreateCurrencyPreferenceService;
