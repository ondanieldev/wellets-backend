import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateWalletService from '../../../Services/CreateWalletService';

class WalletsController {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { alias, currency_id, balance } = request.body;

    const { id } = request.user;

    const createWallet = container.resolve(CreateWalletService);

    const wallet = await createWallet.execute({
      user_id: id,
      alias,
      currency_id,
      balance,
    });

    return response.json(wallet);
  }
}

export default WalletsController;
