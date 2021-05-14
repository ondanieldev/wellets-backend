import Currency from '../Infra/TypeORM/Entities/Currency';
import ICreateCurrencyDTO from '../DTOs/ICreateCurrencyDTO';

interface ICurrenciesRepository {
  create(data: ICreateCurrencyDTO): Promise<Currency>;
  findByAcronym(
    acronym: string,
    user_id?: string,
  ): Promise<Currency | undefined>;
  save(currency: Currency): Promise<Currency>;
  findById(id: string): Promise<Currency | undefined>;
  find(user_id?: string, get_natives?: boolean): Promise<Currency[]>;
}

export default ICurrenciesRepository;
