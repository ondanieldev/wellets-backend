import Transaction from '../Infra/TypeORM/Entities/Transaction';
import ICreateTransactionDTO from '../DTOs/ICreateTransactionDTO';

interface ITransactionsRepository {
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  findByWalletId(wallet_id: string): Promise<Transaction[]>;
}

export default ITransactionsRepository;
