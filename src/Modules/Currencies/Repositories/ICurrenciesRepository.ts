import Currency from '../Infra/TypeORM/Entities/Currency';
import ICreateCurrencyDTO from '../DTOs/ICreateCurrencyDTO';

interface ICurrenciesRepository {
  create(data: ICreateCurrencyDTO): Promise<Currency>;
  findByAcronym(acronym: string): Promise<Currency | undefined>;
  save(currency: Currency): Promise<Currency>;
}

export default ICurrenciesRepository;
