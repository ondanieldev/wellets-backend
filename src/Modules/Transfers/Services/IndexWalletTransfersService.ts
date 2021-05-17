import { inject, injectable } from 'tsyringe';

import IWalletsRepository from 'Modules/Wallets/Repositories/IWalletsRepository';
import AppError from 'Shared/Errors/AppError';
import ICacheProvider from 'Shared/Containers/CacheProvider/Models/ICacheProvider';
import ITransfersRepository from '../Repositories/ITransfersRepository';
import IFindByWalletIdDTO from '../DTOs/IFindByWalletIdDTO';
import IPaginatedTransfersDTO from '../DTOs/IPaginatedTransfersDTO';

interface IRequest extends IFindByWalletIdDTO {
  user_id: string;
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

  public async execute({
    user_id,
    wallet_id,
    ...rest
  }: IRequest): Promise<IPaginatedTransfersDTO> {
    const wallet = await this.walletsRepository.findById(wallet_id);

    if (!wallet) {
      throw new AppError('This wallet does not exist!', 404);
    }

    if (wallet.user_id !== user_id) {
      throw new AppError('You are not the owner of this wallet!', 403);
    }

    const cacheKey = `transfers:${wallet_id}:${JSON.stringify(rest)}`;

    let transfers = await this.cacheProvider.find<IPaginatedTransfersDTO>(
      cacheKey,
    );

    if (!transfers) {
      transfers = await this.transfersRepository.findByWalletId(
        {
          wallet_id,
          ...rest,
        },
        true,
      );

      this.cacheProvider.save(cacheKey, transfers);
    }

    return transfers;
  }
}

export default IndexWalletTransfersService;
