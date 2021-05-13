import { EntityRepository, Repository, getRepository, IsNull } from 'typeorm';

import Currency from '../Entities/Currency';
import ICreateCurrencyDTO from '../../../DTOs/ICreateCurrencyDTO';
import ICurrenciesRepository from '../../../Repositories/ICurrenciesRepository';

@EntityRepository(Currency)
class CurrenciesRepository implements ICurrenciesRepository {
  private ormRepository: Repository<Currency>;

  constructor() {
    this.ormRepository = getRepository(Currency);
  }

  public async create(data: ICreateCurrencyDTO): Promise<Currency> {
    const currency = this.ormRepository.create(data);

    await this.ormRepository.save(currency);

    return currency;
  }

  public async findByAcronymAndNoUser(
    acronym: string,
  ): Promise<Currency | undefined> {
    return this.ormRepository.findOne({
      where: {
        acronym,
        user_id: IsNull(),
      },
    });
  }

  public async save(currency: Currency): Promise<Currency> {
    await this.ormRepository.save(currency);

    return currency;
  }

  public async findById(id: string): Promise<Currency | undefined> {
    return this.ormRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async find(user_id?: string): Promise<Currency[]> {
    return this.ormRepository.find({
      where: user_id
        ? [{ user_id }, { user_id: IsNull() }]
        : { user_id: IsNull() },
    });
  }

  public async findByAcronymAndUser(
    acronym: string,
    user_id: string,
  ): Promise<Currency | undefined> {
    return this.ormRepository.findOne({
      where: {
        acronym,
        user_id,
      },
    });
  }
}

export default CurrenciesRepository;
