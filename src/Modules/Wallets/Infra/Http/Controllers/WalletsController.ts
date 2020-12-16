import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateWalletService from '../../../Services/CreateWalletService';
import IndexUserWalletsService from '../../../Services/IndexWalletsService';
import DeleteWalletService from '../../../Services/DeleteWalletService';

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

  public async index(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { id } = request.user;

    const indexUserWallets = container.resolve(IndexUserWalletsService);

    const wallets = await indexUserWallets.execute(id);

    return response.json(wallets);
  }

  public async delete(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user } = request;

    const { wallet_id } = request.params;

    const deleteWallet = container.resolve(DeleteWalletService);

    const wallets = await deleteWallet.execute({
      user_id: user.id,
      wallet_id,
    });

    return response.json(wallets);
  }
}

export default WalletsController;
