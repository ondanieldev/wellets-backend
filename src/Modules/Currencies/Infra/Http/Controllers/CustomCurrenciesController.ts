import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import IndexCustomCurrenciesService from 'Modules/Currencies/Services/IndexCustomCurrenciesService';
import CreateCustomCurrencyService from 'Modules/Currencies/Services/CreateCustomCurrencyService';
import UpdateCustomCurrencyService from 'Modules/Currencies/Services/UpdateCustomCurrencyService';
import DeleteCustomCurrencyService from 'Modules/Currencies/Services/DeleteCustomCurrencyService';
import CreateCurrencyPreferenceService from 'Modules/CurrencyPreferences/Services/CreateCurrencyPreferenceService';
import UpdateCurrencyPreferenceService from 'Modules/CurrencyPreferences/Services/UpdateCurrencyPreferenceService';

class CustomCurrenciesController {
  public async index(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user } = request;
    const id = user && user.id ? user.id : '';

    const indexCustomCurrencies = container.resolve(
      IndexCustomCurrenciesService,
    );

    const currencies = await indexCustomCurrencies.execute(id);

    return response.json(currencies);
  }

  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { id } = request.user;
    const { acronym, alias, dollar_rate, format, favorite } = request.body;

    const createCustomCurrency = container.resolve(CreateCustomCurrencyService);
    const createCurrencyPreference = container.resolve(
      CreateCurrencyPreferenceService,
    );

    const currency = await createCustomCurrency.execute({
      user_id: id,
      acronym,
      alias,
      dollar_rate,
      format,
    });

    const currency_preference = await createCurrencyPreference.execute({
      user_id: id,
      currency_id: currency.id,
      favorite: !!favorite,
    });

    currency.favorite = currency_preference.favorite;

    return response.json(currency);
  }

  public async update(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user } = request;
    const { id } = request.params;
    const { acronym, alias, dollar_rate, format, favorite } = request.body;

    const updateCustomCurrency = container.resolve(UpdateCustomCurrencyService);
    const updateCurrencyPreference = container.resolve(
      UpdateCurrencyPreferenceService,
    );

    const currency = await updateCustomCurrency.execute({
      user_id: user.id,
      acronym,
      alias,
      dollar_rate,
      format,
      id,
    });

    const currency_preference = await updateCurrencyPreference.execute({
      user_id: user.id,
      currency_id: currency.id,
      favorite: !!favorite,
    });

    currency.favorite = currency_preference.favorite;

    return response.json(currency);
  }

  public async delete(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user } = request;
    const { id } = request.params;

    const deleteCustomCurrency = container.resolve(DeleteCustomCurrencyService);

    const currency = await deleteCustomCurrency.execute({
      id,
      user_id: user.id,
    });

    return response.json(currency);
  }
}

export default CustomCurrenciesController;
