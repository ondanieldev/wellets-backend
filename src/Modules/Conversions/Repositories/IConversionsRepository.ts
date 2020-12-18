import Conversion from '../Infra/TypeORM/Entities/Conversion';
import ICreateConversionDTO from '../DTOs/ICreateConversionDTO';
import IFindByWalletsIdDTO from '../DTOs/IFindByWalletsIdDTO';

interface IConversionsRepository {
  create(data: ICreateConversionDTO): Promise<Conversion>;
  findByWalletsId(data: IFindByWalletsIdDTO): Promise<Conversion | undefined>;
  findByWalletId(wallet_id: string): Promise<Conversion[]>;
}

export default IConversionsRepository;
