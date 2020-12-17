import { injectable, inject } from 'tsyringe';
import Currency from '../Infra/TypeORM/Entities/Currency';
import ICurrenciesRepository from '../Repositories/ICurrenciesRepository';

@injectable()
class IndexCurrenciesService {
  constructor(
    @inject('CurrenciesRepository')
    private currenciesRepository: ICurrenciesRepository,
  ) {}

  public async execute(): Promise<Currency[]> {
    const currencies = this.currenciesRepository.find();

    return currencies;
  }
}

export default IndexCurrenciesService;
