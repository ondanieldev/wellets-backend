import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateTransactionService from '../../../Services/CreateTransactionService';
import IndexTransactionsService from '../../../Services/IndexTransactionsService';

class TransactionsController {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user } = request;
    const { description, value, wallet_id } = request.body;

    const createTransaction = container.resolve(CreateTransactionService);

    const transaction = await createTransaction.execute({
      user_id: user.id,
      description,
      value,
      wallet_id,
    });

    return response.status(201).json(transaction);
  }

  public async index(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user } = request;
    const { wallet_id } = request.query;

    const indexTransactions = container.resolve(IndexTransactionsService);

    const transactions = await indexTransactions.execute({
      user_id: user.id,
      wallet_id: wallet_id.toString(),
    });

    return response.status(200).json(transactions);
  }
}

export default TransactionsController;
