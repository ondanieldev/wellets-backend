import { inject, injectable } from 'tsyringe';

import IWalletsRepository from 'Modules/Wallets/Repositories/IWalletsRepository';
import AppError from 'Shared/Errors/AppError';
import ICacheProvider from 'Shared/Containers/CacheProvider/Models/ICacheProvider';
import Conversion from '../Infra/TypeORM/Entities/Conversion';
import IConversionsRepository from '../Repositories/IConversionsRepository';

interface IRequest {
  user_id: string;
  wallet_id: string;
}

@injectable()
class IndexWalletConversionsService {
  constructor(
    @inject('ConversionsRepository')
    private conversionsRepository: IConversionsRepository,

    @inject('WalletsRepository')
    private walletsRepository: IWalletsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    wallet_id,
  }: IRequest): Promise<Conversion[]> {
    const wallet = await this.walletsRepository.findById(wallet_id);

    if (!wallet) {
      throw new AppError('This wallet does not exist!', 404);
    }

    if (wallet.user_id !== user_id) {
      throw new AppError('You are not the owner of this wallet!', 403);
    }

    let conversions = await this.cacheProvider.find<Conversion[]>(
      `conversions:${wallet_id}`,
    );

    if (!conversions) {
      conversions = await this.conversionsRepository.findByWalletId(wallet_id);

      this.cacheProvider.save(`conversions:${wallet_id}`, conversions);
    }

    return conversions;
  }
}

export default IndexWalletConversionsService;
