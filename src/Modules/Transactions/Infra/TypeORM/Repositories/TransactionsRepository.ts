import { EntityRepository, Repository, getRepository } from 'typeorm';

import ITransactionsRepository from 'Modules/Transactions/Repositories/ITransactionsRepository';
import ICreateTransactionDTO from 'Modules/Transactions/DTOs/ICreateTransactionDTO';
import Transaction from '../Entities/Transaction';

@EntityRepository(Transaction)
class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async create(data: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.ormRepository.create(data);

    await this.ormRepository.save(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
