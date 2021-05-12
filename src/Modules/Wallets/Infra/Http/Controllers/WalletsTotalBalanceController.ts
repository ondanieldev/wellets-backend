import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import EstimateTotalBalanceService from '../../../Services/EstimateTotalBalanceService';

class WalletsTotalBalanceController {
  public async show(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { base_currency_id } = request.query;

    const { id } = request.user;

    const estimateTotalBalance = container.resolve(EstimateTotalBalanceService);

    const result = await estimateTotalBalance.execute({
      user_id: id,
      base_currency_id: base_currency_id.toString(),
    });

    return response.status(200).json(result);
  }
}

export default WalletsTotalBalanceController;
