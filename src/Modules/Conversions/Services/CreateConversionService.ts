import { inject, injectable } from 'tsyringe';

import IWalletsRepository from 'Modules/Wallets/Repositories/IWalletsRepository';
import AppError from 'Shared/Errors/AppError';
import Conversion from '../Infra/TypeORM/Entities/Conversion';
import ICreateConversionDTO from '../DTOs/ICreateConversionDTO';
import IConversionsRepository from '../Repositories/IConversionsRepository';

interface IRequest extends ICreateConversionDTO {
  user_id: string;
}

@injectable()
class CreateConversionService {
  constructor(
    @inject('ConversionsRepository')
    private conversionsRepository: IConversionsRepository,

    @inject('WalletsRepository')
    private walletsRepository: IWalletsRepository,
  ) {}

  public async execute({
    from_wallet_id,
    to_wallet_id,
    percentual_rate,
    static_rate,
    user_id,
  }: IRequest): Promise<Conversion> {
    const fromWallet = await this.walletsRepository.findById(from_wallet_id);

    const toWallet = await this.walletsRepository.findById(to_wallet_id);

    if (!fromWallet || !toWallet) {
      throw new AppError(
        'Some wallets involved on conversion does not exist!',
        404,
      );
    }

    if (fromWallet.user_id !== user_id || toWallet.user_id !== user_id) {
      throw new AppError('You need to be the owner of the both wallets!', 403);
    }

    const conversionExist = await this.conversionsRepository.findByWalletsId({
      from_wallet_id,
      to_wallet_id,
    });

    if (conversionExist) {
      const reverseConversionExist = await this.conversionsRepository.findByWalletsId(
        {
          from_wallet_id: to_wallet_id,
          to_wallet_id: from_wallet_id,
        },
      );

      if (!reverseConversionExist) {
        throw new AppError(
          'This conversion is already set up! However, the reverse conversion do not.',
          409,
        );
      }

      throw new AppError(
        'This conversion is already set up! Maybe you are looking for update instead create.',
        409,
      );
    }

    const conversion = await this.conversionsRepository.create({
      from_wallet_id,
      percentual_rate,
      static_rate,
      to_wallet_id,
    });

    return conversion;
  }
}

export default CreateConversionService;
