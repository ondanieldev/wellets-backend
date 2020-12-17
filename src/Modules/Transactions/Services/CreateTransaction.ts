import { injectable, inject } from 'tsyringe';

import IWalletsRepository from 'Modules/Wallets/Repositories/IWalletsRepository';
import AppError from 'Shared/Errors/AppError';
import Transaction from '../Infra/TypeORM/Entities/Transaction';
import ICreateTransactionDTO from '../DTOs/ICreateTransactionDTO';
import ITransactionsRepository from '../Repositories/ITransactionsRepository';

interface IRequest extends ICreateTransactionDTO {
  user_id: string;
}

@injectable()
class CreateTransaction {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('WalletsRepository')
    private walletsRepository: IWalletsRepository,
  ) {}

  public async execute({
    wallet_id,
    description,
    value,
    user_id,
  }: IRequest): Promise<Transaction> {
    const wallet = await this.walletsRepository.findById(wallet_id);

    if (!wallet) {
      throw new AppError('This wallet does not exist!', 404);
    }

    if (wallet.user_id !== user_id) {
      throw new AppError('You are not the owner of this wallet!', 403);
    }

    const transaction = await this.transactionsRepository.create({
      description,
      value,
      wallet_id,
    });

    return transaction;
  }
}

export default CreateTransaction;
