import Conversion from '../Infra/TypeORM/Entities/Conversion';
import ICreateConversionDTO from '../DTOs/ICreateConversionDTO';
import IFindByWalletsIdDTO from '../DTOs/IFindByWalletsIdDTO';

interface IConversionsRepository {
  create(data: ICreateConversionDTO): Promise<Conversion>;
  findByWalletsId(data: IFindByWalletsIdDTO): Promise<Conversion | undefined>;
}

export default IConversionsRepository;
