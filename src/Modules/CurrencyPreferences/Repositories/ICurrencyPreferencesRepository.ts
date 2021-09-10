import CurrencyPreference from '../Infra/TypeORM/Entities/CurrencyPreference';
import ICreateCurrencyPreferenceDTO from '../DTOs/ICreateCurrencyPreferenceDTO';

interface ICurrencyPreferencesRepository {
  create(data: ICreateCurrencyPreferenceDTO): Promise<CurrencyPreference>;
  save(currency: CurrencyPreference): Promise<CurrencyPreference>;
  findById(id: string): Promise<CurrencyPreference | undefined>;
  find(
    user_id: string,
    currency_id: string,
  ): Promise<CurrencyPreference | undefined>;
  delete(id: string): Promise<void>;
}

export default ICurrencyPreferencesRepository;
