import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import IndexCurrenciesService from 'Modules/Currencies/Services/IndexCurrenciesService';
import CreateOrUpdateCurrencyPreferenceService from 'Modules/CurrencyPreferences/Services/CreateOrUpdateCurrencyPreferenceService';

class CurrenciesController {
  public async index(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user } = request;
    const { sortBy } = request.query;
    const id = user && user.id ? user.id : '';

    const indexCurrencies = container.resolve(IndexCurrenciesService);

    const currencies = await indexCurrencies.execute(
      id,
      (typeof sortBy === 'string' && sortBy) || undefined,
    );

    return response.json(currencies);
  }

  public async update(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user } = request;
    const { id } = request.params;

    const { favorite } = request.body;

    const createOrUpdateCurrencyPreference = container.resolve(
      CreateOrUpdateCurrencyPreferenceService,
    );

    const currencyPreference = await createOrUpdateCurrencyPreference.execute({
      user_id: user.id,
      currency_id: id,
      favorite,
    });

    return response.json(currencyPreference);
  }
}

export default CurrenciesController;
