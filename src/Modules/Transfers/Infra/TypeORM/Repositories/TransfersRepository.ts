import { EntityRepository, getRepository, Repository } from 'typeorm';

import ICreateTransferDTO from 'Modules/Transfers/DTOs/ICreateTransferDTO';
import ITransfersRepository from 'Modules/Transfers/Repositories/ITransfersRepository';
import IFindByWalletsIdDTO from 'Modules/Transfers/DTOs/IFindByWalletsIdDTO';
import Transfer from '../Entities/Transfer';

@EntityRepository(Transfer)
class TransfersRepository implements ITransfersRepository {
  private ormRepository: Repository<Transfer>;

  constructor() {
    this.ormRepository = getRepository(Transfer);
  }

  public async create(data: ICreateTransferDTO): Promise<Transfer> {
    const transfer = this.ormRepository.create(data);

    await this.ormRepository.save(transfer);

    return transfer;
  }

  public async findByWalletsId({
    from_wallet_id,
    to_wallet_id,
  }: IFindByWalletsIdDTO): Promise<Transfer | undefined> {
    const transfer = await this.ormRepository.findOne({
      where: {
        from_wallet_id,
        to_wallet_id,
      },
    });

    return transfer;
  }

  public async findByWalletId(wallet_id: string): Promise<Transfer[]> {
    const transfers = await this.ormRepository.find({
      where: [
        {
          from_wallet_id: wallet_id,
        },
        {
          to_wallet_id: wallet_id,
        },
      ],
    });

    return transfers;
  }
}

export default TransfersRepository;
