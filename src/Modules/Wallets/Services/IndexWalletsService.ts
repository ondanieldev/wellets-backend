import { inject, injectable } from 'tsyringe';

import ICacheProvider from 'Shared/Containers/CacheProvider/Models/ICacheProvider';
import IWalletsRepository from '../Repositories/IWalletsRepository';
import Wallet from '../Infra/TypeORM/Entities/Wallet';

@injectable()
class IndexWalletsService {
  constructor(
    @inject('WalletsRepository')
    private walletsRepository: IWalletsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<Wallet[]> {
    let wallets = await this.cacheProvider.find<Wallet[]>(`wallets:${user_id}`);

    if (!wallets) {
      wallets = await this.walletsRepository.findByUserId(user_id);

      this.cacheProvider.save<Wallet[]>(`wallets:${user_id}`, wallets);
    }

    return wallets;
  }
}

export default IndexWalletsService;
