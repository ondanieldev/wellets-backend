import { injectable, inject } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import ICacheProvider from 'Shared/Containers/CacheProvider/Models/ICacheProvider';
import IWalletsRepository from 'Modules/Wallets/Repositories/IWalletsRepository';
import Transaction from '../Infra/TypeORM/Entities/Transaction';
import ITransactionsRepository from '../Repositories/ITransactionsRepository';

interface IRequest {
  user_id: string;
  wallet_id: string;
}

@injectable()
class IndexTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('WalletsRepository')
    private walletsRepository: IWalletsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    wallet_id,
  }: IRequest): Promise<Transaction[]> {
    const wallet = await this.walletsRepository.findById(wallet_id);

    if (!wallet) {
      throw new AppError('This wallet does not exist!', 404);
    }

    if (wallet.user_id !== user_id) {
      throw new AppError('You are not the owner of this wallet!', 403);
    }

    let transactions = await this.cacheProvider.find<Transaction[]>(
      `transactions:${wallet_id}`,
    );

    if (!transactions) {
      transactions = await this.transactionsRepository.findByWalletId(
        wallet_id,
      );

      this.cacheProvider.save(`transactions:${wallet_id}`, transactions);
    }

    return transactions;
  }
}

export default IndexTransactionsService;
