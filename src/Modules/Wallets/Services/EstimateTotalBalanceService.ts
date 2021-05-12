import { injectable, inject } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import ICurrenciesRepository from 'Modules/Currencies/Repositories/ICurrenciesRepository';
import Currency from 'Modules/Currencies/Infra/TypeORM/Entities/Currency';
import IWalletsRepository from '../Repositories/IWalletsRepository';

interface IRequest {
  base_currency_id: string;
  user_id: string;
}

interface IResponse {
  total_balance: number;
  base_currency: Currency;
}

@injectable()
class EstimateTotalBalanceService {
  constructor(
    @inject('WalletsRepository')
    private walletsRepository: IWalletsRepository,

    @inject('CurrenciesRepository')
    private currenciesRepository: ICurrenciesRepository,
  ) {}

  public async execute({
    user_id,
    base_currency_id,
  }: IRequest): Promise<IResponse> {
    const { wallets } = await this.walletsRepository.findByUserId({
      user_id,
    });

    const baseCurrency = await this.currenciesRepository.findById(
      base_currency_id,
    );

    if (!baseCurrency) {
      throw new AppError('The base currency selected does not exist!', 404);
    }

    let totalBalance = 0;

    for (const wallet of wallets) {
      const walletBalance = Number(wallet.balance);

      if (wallet.currency_id === baseCurrency.id) {
        totalBalance += walletBalance;
        continue;
      }

      const walletCurrency = await this.currenciesRepository.findById(
        wallet.currency_id,
      );

      if (!walletCurrency) {
        throw new AppError(
          'Sorry, the currency attached to your wallet was not found!',
          404,
        );
      }

      const baseRate = Number(baseCurrency.dollar_rate);
      const desiredRate = Number(walletCurrency.dollar_rate);

      totalBalance += (baseRate * walletBalance) / desiredRate;
    }

    return {
      base_currency: baseCurrency,
      total_balance: totalBalance,
    };
  }
}

export default EstimateTotalBalanceService;
