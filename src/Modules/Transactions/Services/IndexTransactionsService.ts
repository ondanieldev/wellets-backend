import { injectable, inject } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import ICacheProvider from 'Shared/Containers/CacheProvider/Models/ICacheProvider';
import IWalletsRepository from 'Modules/Wallets/Repositories/IWalletsRepository';
import IPaginatedTransactionsDTO from 'Modules/Transactions/DTOs/IPaginatedTransactionsDTO';
import ITransactionsRepository from '../Repositories/ITransactionsRepository';
import IFindByWalletIdDTO from '../DTOs/IFindByWalletIdDTO';

interface IRequest extends IFindByWalletIdDTO {
  user_id: string;
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
    ...rest
  }: IRequest): Promise<IPaginatedTransactionsDTO> {
    const wallet = await this.walletsRepository.findById(wallet_id);

    if (!wallet) {
      throw new AppError('This wallet does not exist!', 404);
    }

    if (wallet.user_id !== user_id) {
      throw new AppError('You are not the owner of this wallet!', 403);
    }

    const cacheKey = `transactions:${wallet_id}:${JSON.stringify(rest)}`;

    let transactions = await this.cacheProvider.find<IPaginatedTransactionsDTO>(
      cacheKey,
    );

    if (!transactions) {
      transactions = await this.transactionsRepository.findByWalletId({
        wallet_id,
        ...rest,
      });

      this.cacheProvider.save(cacheKey, transactions);
    }

    return transactions;
  }
}

export default IndexTransactionsService;
