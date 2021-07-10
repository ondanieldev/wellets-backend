import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import ShowCurrencyRate from 'Modules/Currencies/Services/ShowCurrencyRate';

class CurrencyRatesController {
  public async show(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user } = request;
    const { base_currency, target_currency } = request.query;

    const id = user && user.id ? user.id : '';

    const showCurrencyRate = container.resolve(ShowCurrencyRate);

    const currencies = await showCurrencyRate.execute({
      base_currency: base_currency.toString(),
      target_currency: target_currency.toString(),
      user_id: id,
    });

    return response.json(currencies);
  }
}

export default CurrencyRatesController;
