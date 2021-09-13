import { inject, injectable, container } from 'tsyringe';

import CurrencyPreference from '../Infra/TypeORM/Entities/CurrencyPreference';
import UpdateCurrencyPreferenceService from './UpdateCurrencyPreferenceService';
import CreateCurrencyPreferenceService from './CreateCurrencyPreferenceService';
import ICurrencyPreferencesRepository from '../Repositories/ICurrencyPreferencesRepository';
import IUpsertCurrencyPreferenceDTO from '../DTOs/IUpsertCurrencyPreferenceDTO';

@injectable()
class UpsertCurrencyPreferenceService {
  constructor(
    @inject('CurrencyPreferencesRepository')
    private currencyPreferencesRepository: ICurrencyPreferencesRepository,
  ) {}

  public async execute(
    data: IUpsertCurrencyPreferenceDTO,
  ): Promise<CurrencyPreference> {
    const createCurrencyPreference = container.resolve(
      CreateCurrencyPreferenceService,
    );
    const updateCurrencyPreference = container.resolve(
      UpdateCurrencyPreferenceService,
    );

    const exists = await this.currencyPreferencesRepository.find(
      data.user_id,
      data.currency_id,
    );

    if (exists) {
      return updateCurrencyPreference.execute({
        user_id: exists.user_id,
        currency_id: exists.currency_id,
        favorite: data.favorite,
      });
    }

    return createCurrencyPreference.execute({
      user_id: data.user_id,
      currency_id: data.currency_id,
      favorite: data.favorite,
    });
  }
}

export default UpsertCurrencyPreferenceService;
