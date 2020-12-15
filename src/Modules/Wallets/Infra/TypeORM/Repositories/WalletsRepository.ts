import { EntityRepository, getRepository, Repository } from 'typeorm';

import Wallet from '../Entities/Wallet';
import ICreateWalletDTO from '../../../DTOs/ICreateWalletDTO';
import IWalletsRepository from '../../../Repositories/IWalletsRepository';

@EntityRepository(Wallet)
class WalletsRepository implements IWalletsRepository {
  private ormRepository: Repository<Wallet>;

  constructor() {
    this.ormRepository = getRepository(Wallet);
  }

  public async create(data: ICreateWalletDTO): Promise<Wallet> {
    const wallet = this.ormRepository.create(data);

    await this.ormRepository.save(wallet);

    return wallet;
  }

  public async findByUserIdAndAlias(
    user_id: string,
    alias: string,
  ): Promise<Wallet | undefined> {
    const wallet = await this.ormRepository.findOne({
      where: {
        user_id,
        alias,
      },
    });

    return wallet;
  }
}

export default WalletsRepository;
