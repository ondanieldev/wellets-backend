import AppError from 'Shared/Errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICurrenciesRepository from '../Repositories/ICurrenciesRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DeleteCustomCurrencyService {
  constructor(
    @inject('CurrenciesRepository')
    private currenciesRepository: ICurrenciesRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<void> {
    const currency = await this.currenciesRepository.findById(id);

    if (!currency) {
      throw new AppError('This currency does not exist!', 404);
    }

    if (currency.user_id !== user_id) {
      throw new AppError(
        'You do not have permission to delete this currency!',
        403,
      );
    }

    await this.currenciesRepository.delete(currency.id);
  }
}

export default DeleteCustomCurrencyService;
