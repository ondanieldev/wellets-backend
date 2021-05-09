import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateTransferService from '../../../Services/CreateTransferService';
import IndexWalletTransfersService from '../../../Services/IndexWalletTransfersService';

class TransfersController {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const {
      from_wallet_id,
      percentual_rate,
      static_rate,
      to_wallet_id,
      value,
    } = request.body;

    const { user } = request;

    const createTransfer = container.resolve(CreateTransferService);

    const conversion = await createTransfer.execute({
      user_id: user.id,
      from_wallet_id,
      percentual_rate,
      static_rate,
      to_wallet_id,
      value,
    });

    return response.status(201).json(conversion);
  }

  public async index(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { wallet_id, limit, page } = request.query;

    const { user } = request;

    const indexWalletTransfers = container.resolve(IndexWalletTransfersService);

    const transfers = await indexWalletTransfers.execute({
      user_id: user.id,
      wallet_id: wallet_id.toString(),
      limit: Number(limit),
      page: Number(page),
    });

    return response.status(201).json(transfers);
  }
}

export default TransfersController;
