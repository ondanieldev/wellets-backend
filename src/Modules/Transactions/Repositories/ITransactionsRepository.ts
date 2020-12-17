import Transaction from '../Infra/TypeORM/Entities/Transaction';
import ICreateTransactionDTO from '../DTOs/ICreateTransactionDTO';

interface ITransactionsRepository {
  create(data: ICreateTransactionDTO): Promise<Transaction>;
}

export default ITransactionsRepository;
