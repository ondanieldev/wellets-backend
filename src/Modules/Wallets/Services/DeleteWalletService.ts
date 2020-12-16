import AppError from 'Shared/Errors/AppError';
import { inject, injectable } from 'tsyringe';

import Wallet from '../Infra/TypeORM/Entities/Wallet';
import IWalletsRepository from '../Repositories/IWalletsRepository';

interface IRequest {
  wallet_id: string;
  user_id: string;
}

@injectable()
class DeleteWalletsService {
  constructor(
    @inject('WalletsRepository')
    private walletsRepository: IWalletsRepository,
  ) {}

  public async execute({ wallet_id, user_id }: IRequest): Promise<void> {
    const wallet = await this.walletsRepository.findById(wallet_id);

    if (!wallet) {
      throw new AppError('This wallet does not exist!');
    }

    if (wallet.user_id !== user_id) {
      throw new AppError('You are not the owner of this wallet!');
    }

    await this.walletsRepository.delete(wallet_id);
  }
}

export default DeleteWalletsService;
