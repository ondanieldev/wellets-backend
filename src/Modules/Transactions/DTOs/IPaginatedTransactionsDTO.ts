import Transaction from 'Modules/Transactions/Infra/TypeORM/Entities/Transaction';

interface IPaginatedTransactionsDTO {
  transactions: Transaction[];
  total: number;
}

export default IPaginatedTransactionsDTO;
