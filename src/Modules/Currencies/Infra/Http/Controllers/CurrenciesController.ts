import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateCurrenciesService from '../../../Services/CreateCurrenciesService';
import UpdateCurrenciesService from '../../../Services/UpdateCurrenciesService';

class CurrenciesController {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const createCurrencies = container.resolve(CreateCurrenciesService);

    await createCurrencies.execute();

    return response.status(201).json();
  }

  public async update(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const updateCurrencies = container.resolve(UpdateCurrenciesService);

    await updateCurrencies.execute();

    return response.status(201).json();
  }
}

export default CurrenciesController;
