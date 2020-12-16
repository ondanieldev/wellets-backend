import { inject, injectable } from 'tsyringe';

import Wallet from '../Infra/TypeORM/Entities/Wallet';
import IWalletsRepository from '../Repositories/IWalletsRepository';

@injectable()
class IndexWalletsService {
  constructor(
    @inject('WalletsRepository')
    private walletsRepository: IWalletsRepository,
  ) {}

  public async execute(user_id: string): Promise<Wallet[]> {
    const wallets = await this.walletsRepository.findByUserId(user_id);

    return wallets;
  }
}

export default IndexWalletsService;
