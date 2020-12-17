import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import IndexCurrenciesService from '../../../Services/IndexCurrenciesService';

class CurrenciesController {
  public async index(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const indexCurrencies = container.resolve(IndexCurrenciesService);

    const currencies = await indexCurrencies.execute();

    return response.status(200).json(currencies);
  }
}

export default CurrenciesController;
