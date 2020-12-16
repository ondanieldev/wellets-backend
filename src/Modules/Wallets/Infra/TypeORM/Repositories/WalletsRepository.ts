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

  public async findByUserId(user_id: string): Promise<Wallet[]> {
    const wallets = await this.ormRepository.find({
      where: {
        user_id,
      },
    });

    return wallets;
  }

  public async findById(id: string): Promise<Wallet> {
    const wallet = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return wallet;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default WalletsRepository;
