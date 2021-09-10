import { Repository, getRepository } from 'typeorm';

import CurrencyPreference from '../Entities/CurrencyPreference';
import ICreateCurrencyPreferenceDTO from '../../../DTOs/ICreateCurrencyPreferenceDTO';
import ICurrencyPreferencesRepository from '../../../Repositories/ICurrencyPreferencesRepository';

class CurrencyPreferencesRepository implements ICurrencyPreferencesRepository {
  private ormRepository: Repository<CurrencyPreference>;

  constructor() {
    this.ormRepository = getRepository(CurrencyPreference);
  }

  public async create(
    data: ICreateCurrencyPreferenceDTO,
  ): Promise<CurrencyPreference> {
    const currency = this.ormRepository.create(data);

    await this.ormRepository.save(currency);

    return currency;
  }

  public async save(currency: CurrencyPreference): Promise<CurrencyPreference> {
    await this.ormRepository.save(currency);

    return currency;
  }

  public async findById(id: string): Promise<CurrencyPreference | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async find(
    user_id: string,
    currency_id: string,
  ): Promise<CurrencyPreference | undefined> {
    return this.ormRepository.findOne({ where: { user_id, currency_id } });
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default CurrencyPreferencesRepository;
