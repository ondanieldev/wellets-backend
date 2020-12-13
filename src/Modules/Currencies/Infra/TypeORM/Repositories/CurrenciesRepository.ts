import { EntityRepository, Repository, getRepository } from 'typeorm';

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

  public async findByAcronym(acronym: string): Promise<Currency | undefined> {
    const currency = await this.ormRepository.findOne({
      where: {
        acronym,
      },
    });

    return currency;
  }

  public async save(currency: Currency): Promise<Currency> {
    await this.ormRepository.save(currency);

    return currency;
  }
}

export default CurrenciesRepository;
