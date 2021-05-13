import { Request, Response, NextFunction } from 'express';
import CreateCustomCurrencyService from 'Modules/Currencies/Services/CreateCustomCurrencyService';
import { container } from 'tsyringe';

import IndexCurrenciesService from '../../../Services/IndexCurrenciesService';

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

  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { id } = request.user;
    const { acronym, alias, dollar_rate, format } = request.body;

    const createCustomCurrency = container.resolve(CreateCustomCurrencyService);

    const currency = await createCustomCurrency.execute({
      user_id: id,
      acronym,
      alias,
      dollar_rate,
      format,
    });

    return response.json(currency);
  }
}

export default CurrenciesController;
