import { injectable, inject } from 'tsyringe';
import Currency from '../Infra/TypeORM/Entities/Currency';
import ICurrenciesRepository from '../Repositories/ICurrenciesRepository';

@injectable()
class IndexCurrenciesService {
  constructor(
    @inject('CurrenciesRepository')
    private currenciesRepository: ICurrenciesRepository,
  ) {}

  public async execute(user_id?: string): Promise<Currency[]> {
    return this.currenciesRepository.find(user_id);
  }
}

export default IndexCurrenciesService;
