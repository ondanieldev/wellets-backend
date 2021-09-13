import { inject, injectable } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import CurrencyPreference from '../Infra/TypeORM/Entities/CurrencyPreference';
import ICurrencyPreferencesRepository from '../Repositories/ICurrencyPreferencesRepository';
import IUpsertCurrencyPreferenceDTO from '../DTOs/IUpsertCurrencyPreferenceDTO';

@injectable()
class UpdateCurrencyPreferenceService {
  constructor(
    @inject('CurrencyPreferencesRepository')
    private currencyPreferencesRepository: ICurrencyPreferencesRepository,
  ) {}

  public async execute({
    user_id,
    currency_id,
    ...data
  }: IUpsertCurrencyPreferenceDTO): Promise<CurrencyPreference> {
    const currencyPreference = await this.currencyPreferencesRepository.find(
      user_id,
      currency_id,
    );

    if (!currencyPreference) {
      throw new AppError('This currency preference does not exist!', 404);
    }

    if (currencyPreference.user_id !== user_id) {
      throw new AppError(
        'You does not have permission to manage this currency preference!',
        403,
      );
    }

    Object.assign(currencyPreference, data);

    await this.currencyPreferencesRepository.save(currencyPreference);

    return currencyPreference;
  }
}

export default UpdateCurrencyPreferenceService;
