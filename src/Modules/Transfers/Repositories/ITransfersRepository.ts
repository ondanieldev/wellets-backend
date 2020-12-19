import Transfer from '../Infra/TypeORM/Entities/Transfer';
import ICreateTransferDTO from '../DTOs/ICreateTransferDTO';
import IFindByWalletsIdDTO from '../DTOs/IFindByWalletsIdDTO';

interface ITransfersRepository {
  create(data: ICreateTransferDTO): Promise<Transfer>;
  findByWalletsId(data: IFindByWalletsIdDTO): Promise<Transfer | undefined>;
  findByWalletId(wallet_id: string): Promise<Transfer[]>;
}

export default ITransfersRepository;
