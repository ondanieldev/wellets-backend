import { injectable, inject } from 'tsyringe';
import Currency from '../Infra/TypeORM/Entities/Currency';
import ICurrenciesRepository from '../Repositories/ICurrenciesRepository';

@injectable()
class IndexCurrenciesService {
  constructor(
    @inject('CurrenciesRepository')
    private currenciesRepository: ICurrenciesRepository,
  ) {}

  public async execute(user_id?: string, sortBy?: string): Promise<Currency[]> {
    const sort_by_favorite = !sortBy || sortBy === 'favorite';

    return this.currenciesRepository.find(user_id, true, sort_by_favorite);
  }
}

export default IndexCurrenciesService;
