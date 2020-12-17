import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateTransaction from '../../../Services/CreateTransaction';

class TransactionsController {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user } = request;
    const { description, value, wallet_id } = request.body;

    const createTransaction = container.resolve(CreateTransaction);

    const transaction = await createTransaction.execute({
      user_id: user.id,
      description,
      value,
      wallet_id,
    });

    return response.status(201).json(transaction);
  }
}

export default TransactionsController;
