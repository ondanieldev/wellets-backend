import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import ShowWalletBalance from '../../../Services/ShowWalletBalance';

class WalletsTotalBalanceController {
  public async show(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { target_currency, wallet_id } = request.query;

    const { id } = request.user;

    const showWalletBalance = container.resolve(ShowWalletBalance);

    const result = await showWalletBalance.execute({
      target_currency: target_currency.toString(),
      user_id: id,
      wallet_id: wallet_id.toString(),
    });

    return response.json(result);
  }
}

export default WalletsTotalBalanceController;
