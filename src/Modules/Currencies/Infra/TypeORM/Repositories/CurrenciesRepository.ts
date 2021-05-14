import {
  EntityRepository,
  Repository,
  getRepository,
  IsNull,
  FindConditions,
} from 'typeorm';

import Currency from '../Entities/Currency';
import ICreateCurrencyDTO from '../../../DTOs/ICreateCurrencyDTO';
import ICurrenciesRepository from '../../../Repositories/ICurrenciesRepository';

type Where = FindConditions<Currency>[] | FindConditions<Currency>;
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

  public async find(
    user_id?: string,
    get_natives?: boolean,
  ): Promise<Currency[]> {
    let where = { user_id: IsNull() } as Where;

    if (user_id) {
      where = get_natives ? [{ user_id }, { user_id: IsNull() }] : { user_id };
    }

    return this.ormRepository.find({
      where,
    });
  }

  public async findByAcronym(
    acronym: string,
    user_id?: string,
  ): Promise<Currency | undefined> {
    return this.ormRepository.findOne({
      where: user_id
        ? [
            {
              acronym,
              user_id,
            },
            {
              acronym,
              user_id: IsNull(),
            },
          ]
        : {
            acronym,
            user_id: IsNull(),
          },
    });
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default CurrenciesRepository;
