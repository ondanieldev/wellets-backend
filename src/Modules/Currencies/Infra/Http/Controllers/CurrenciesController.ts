import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import IndexCurrenciesService from 'Modules/Currencies/Services/IndexCurrenciesService';

class CurrenciesController {
  public async index(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user } = request;
    const id = user && user.id ? user.id : '';

    const indexCurrencies = container.resolve(IndexCurrenciesService);

    const currencies = await indexCurrencies.execute(id);

    return response.json(currencies);
  }
}

export default CurrenciesController;
