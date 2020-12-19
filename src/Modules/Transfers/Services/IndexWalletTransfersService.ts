import { inject, injectable } from 'tsyringe';

import IWalletsRepository from 'Modules/Wallets/Repositories/IWalletsRepository';
import AppError from 'Shared/Errors/AppError';
import ICacheProvider from 'Shared/Containers/CacheProvider/Models/ICacheProvider';
import Transfer from '../Infra/TypeORM/Entities/Transfer';
import ITransfersRepository from '../Repositories/ITransfersRepository';

interface IRequest {
  user_id: string;
  wallet_id: string;
}

@injectable()
class IndexWalletTransfersService {
  constructor(
    @inject('TransfersRepository')
    private transfersRepository: ITransfersRepository,

    @inject('WalletsRepository')
    private walletsRepository: IWalletsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id, wallet_id }: IRequest): Promise<Transfer[]> {
    const wallet = await this.walletsRepository.findById(wallet_id);

    if (!wallet) {
      throw new AppError('This wallet does not exist!', 404);
    }

    if (wallet.user_id !== user_id) {
      throw new AppError('You are not the owner of this wallet!', 403);
    }

    let transfers = await this.cacheProvider.find<Transfer[]>(
      `transfers:${wallet_id}`,
    );

    if (!transfers) {
      transfers = await this.transfersRepository.findByWalletId(wallet_id);

      this.cacheProvider.save(`transfers:${wallet_id}`, transfers);
    }

    return transfers;
  }
}

export default IndexWalletTransfersService;
