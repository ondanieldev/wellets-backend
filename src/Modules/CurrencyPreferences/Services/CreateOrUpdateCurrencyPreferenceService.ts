import { inject, injectable, container } from 'tsyringe';

import CurrencyPreference from '../Infra/TypeORM/Entities/CurrencyPreference';
import ICreateOrUpdateCurrencyPreferenceDTO from '../DTOs/ICreateOrUpdateCurrencyPreferenceDTO';
import UpdateCurrencyPreferenceService from './UpdateCurrencyPreferenceService';
import CreateCurrencyPreferenceService from './CreateCurrencyPreferenceService';
import ICurrencyPreferencesRepository from '../Repositories/ICurrencyPreferencesRepository';

@injectable()
class CreateOrUpdateCurrencyPreferenceService {
  constructor(
    @inject('CurrencyPreferencesRepository')
    private currencyPreferencesRepository: ICurrencyPreferencesRepository,
  ) {}

  public async execute(
    data: ICreateOrUpdateCurrencyPreferenceDTO,
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

export default CreateOrUpdateCurrencyPreferenceService;
