import AppError from 'Shared/Errors/AppError';
import { injectable, inject, container } from 'tsyringe';

import ShowCurrencyRate from 'Modules/Currencies/Services/ShowCurrencyRate';
import IWalletsRepository from '../Repositories/IWalletsRepository';

interface IRequest {
  wallet_id: string;
  target_currency: string;
  user_id: string;
}

interface IResponse {
  balance: number;
}

@injectable()
class ShowWalletBalance {
  constructor(
    @inject('WalletsRepository')
    private walletsRepository: IWalletsRepository,
  ) {}

  public async execute({
    target_currency,
    wallet_id,
    user_id,
  }: IRequest): Promise<IResponse> {
    const wallet = await this.walletsRepository.findById(wallet_id, true);
    if (!wallet || wallet.user_id !== user_id) {
      throw new AppError('Wallet not found!', 404);
    }

    const showCurrencyRate = container.resolve(ShowCurrencyRate);
    const rate = await showCurrencyRate.execute({
      base_currency: wallet.currency.acronym,
      target_currency,
      user_id,
    });

    const balance = rate.rate * wallet.balance;

    return {
      balance,
    };
  }
}

export default ShowWalletBalance;
