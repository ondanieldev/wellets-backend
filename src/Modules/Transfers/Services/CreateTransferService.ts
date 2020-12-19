import { inject, injectable } from 'tsyringe';

import IWalletsRepository from 'Modules/Wallets/Repositories/IWalletsRepository';
import AppError from 'Shared/Errors/AppError';
import ICacheProvider from 'Shared/Containers/CacheProvider/Models/ICacheProvider';
import ITransactionsRepository from 'Modules/Transactions/Repositories/ITransactionsRepository';
import ICurrenciesRepository from 'Modules/Currencies/Repositories/ICurrenciesRepository';
import Transfer from '../Infra/TypeORM/Entities/Transfer';
import ICreateTransferDTO from '../DTOs/ICreateTransferDTO';
import ITransfersRepository from '../Repositories/ITransfersRepository';

interface IRequest extends ICreateTransferDTO {
  user_id: string;
}

@injectable()
class CreateTransferService {
  constructor(
    @inject('TransfersRepository')
    private transfersRepository: ITransfersRepository,

    @inject('WalletsRepository')
    private walletsRepository: IWalletsRepository,

    @inject('CurrenciesRepository')
    private currenciesRepository: ICurrenciesRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    from_wallet_id,
    to_wallet_id,
    value,
    percentual_rate,
    static_rate,
    user_id,
  }: IRequest): Promise<Transfer> {
    // Get wallets
    const fromWallet = await this.walletsRepository.findById(from_wallet_id);
    const toWallet = await this.walletsRepository.findById(to_wallet_id);

    if (!fromWallet || !toWallet) {
      throw new AppError(
        'Some wallets involved on transfer does not exist!',
        404,
      );
    }

    // Check owner
    if (fromWallet.user_id !== user_id || toWallet.user_id !== user_id) {
      throw new AppError('You need to be the owner of the both wallets!', 403);
    }

    // Check balance
    if (value > fromWallet.balance) {
      throw new AppError('You does not have balance enough!', 400);
    }

    // Convert currencies
    let convertedValue = value - static_rate - percentual_rate * value;

    if (fromWallet.currency_id !== toWallet.currency_id) {
      const fromCurrency = await this.currenciesRepository.findById(
        fromWallet.currency_id,
      );
      const toCurrency = await this.currenciesRepository.findById(
        toWallet.currency_id,
      );

      if (!fromCurrency || !toCurrency) {
        throw new AppError(
          'Sorry, one of your wallets are using an invalid currency!',
          404,
        );
      }

      const fromRate = Number(fromCurrency.dollar_rate);
      const toRate = Number(toCurrency.dollar_rate);
      const fromBalance = Number(fromWallet.balance);

      convertedValue = (toRate * fromBalance) / fromRate;
    }

    // Calculate liquid value
    const liquidValue = convertedValue - static_rate - percentual_rate * value;

    // Do transfer
    const transfer = await this.transfersRepository.create({
      from_wallet_id,
      to_wallet_id,
      value,
      percentual_rate,
      static_rate,
    });

    // Do transactions
    await this.transactionsRepository.create({
      description: `Sent to ${toWallet.alias}`,
      value: value * -1,
      wallet_id: fromWallet.id,
    });
    await this.transactionsRepository.create({
      description: `Received from ${fromWallet.alias}`,
      value: liquidValue,
      wallet_id: toWallet.id,
    });

    // Update balances
    fromWallet.balance = Number(fromWallet.balance) - value;
    toWallet.balance = Number(toWallet.balance) + liquidValue;

    await this.walletsRepository.save(fromWallet);
    await this.walletsRepository.save(toWallet);

    // Invalidate cache
    this.cacheProvider.delete(`transfers:${from_wallet_id}`);
    this.cacheProvider.delete(`transfers:${to_wallet_id}`);

    return transfer;
  }
}

export default CreateTransferService;
