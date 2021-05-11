import IPaginatedTransactionsDTO from 'Modules/Transactions/DTOs/IPaginatedTransactionsDTO';
import Transaction from '../Infra/TypeORM/Entities/Transaction';
import ICreateTransactionDTO from '../DTOs/ICreateTransactionDTO';
import IFindByWalletIdDTO from '../DTOs/IFindByWalletIdDTO';

interface ITransactionsRepository {
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  findByWalletId(
    data: IFindByWalletIdDTO,
    complete?: boolean,
  ): Promise<IPaginatedTransactionsDTO>;
}

export default ITransactionsRepository;
