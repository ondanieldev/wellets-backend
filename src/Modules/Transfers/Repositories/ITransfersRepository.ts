import Transfer from '../Infra/TypeORM/Entities/Transfer';
import ICreateTransferDTO from '../DTOs/ICreateTransferDTO';
import IFindByWalletsIdDTO from '../DTOs/IFindByWalletsIdDTO';
import IFindByWalletIdDTO from '../DTOs/IFindByWalletIdDTO';
import IPaginatedTransfersDTO from '../DTOs/IPaginatedTransfersDTO';

interface ITransfersRepository {
  create(data: ICreateTransferDTO): Promise<Transfer>;
  findByWalletsId(data: IFindByWalletsIdDTO): Promise<Transfer | undefined>;
  findByWalletId(
    data: IFindByWalletIdDTO,
    complete?: boolean,
  ): Promise<IPaginatedTransfersDTO>;
}

export default ITransfersRepository;
