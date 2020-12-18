import { EntityRepository, getRepository, Repository } from 'typeorm';

import ICreateConversionDTO from 'Modules/Conversions/DTOs/ICreateConversionDTO';
import IConversionsRepository from 'Modules/Conversions/Repositories/IConversionsRepository';
import IFindByWalletsIdDTO from 'Modules/Conversions/DTOs/IFindByWalletsIdDTO';
import Conversion from '../Entities/Conversion';

@EntityRepository(Conversion)
class ConversionsRepository implements IConversionsRepository {
  private ormRepository: Repository<Conversion>;

  constructor() {
    this.ormRepository = getRepository(Conversion);
  }

  public async create(data: ICreateConversionDTO): Promise<Conversion> {
    const conversion = this.ormRepository.create(data);

    await this.ormRepository.save(conversion);

    return conversion;
  }

  public async findByWalletsId({
    from_wallet_id,
    to_wallet_id,
  }: IFindByWalletsIdDTO): Promise<Conversion | undefined> {
    const conversion = await this.ormRepository.findOne({
      where: {
        from_wallet_id,
        to_wallet_id,
      },
    });

    return conversion;
  }

  public async findByWalletId(wallet_id: string): Promise<Conversion[]> {
    const conversions = await this.ormRepository.find({
      where: [
        {
          from_wallet_id: wallet_id,
        },
        {
          to_wallet_id: wallet_id,
        },
      ],
    });

    return conversions;
  }
}

export default ConversionsRepository;
