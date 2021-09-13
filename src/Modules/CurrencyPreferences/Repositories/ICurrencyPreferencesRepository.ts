import CurrencyPreference from '../Infra/TypeORM/Entities/CurrencyPreference';
import IUpsertCurrencyPreferenceDTO from '../DTOs/IUpsertCurrencyPreferenceDTO';

interface ICurrencyPreferencesRepository {
  create(data: IUpsertCurrencyPreferenceDTO): Promise<CurrencyPreference>;
  save(currency: CurrencyPreference): Promise<CurrencyPreference>;
  findById(id: string): Promise<CurrencyPreference | undefined>;
  find(
    user_id: string,
    currency_id: string,
  ): Promise<CurrencyPreference | undefined>;
  delete(id: string): Promise<void>;
}

export default ICurrencyPreferencesRepository;
