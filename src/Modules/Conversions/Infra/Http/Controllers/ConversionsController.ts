import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateConversionService from '../../../Services/CreateConversionService';

class ConversionsController {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const {
      from_wallet_id,
      percentual_rate,
      static_rate,
      to_wallet_id,
    } = request.body;

    const { user } = request;

    const createConversion = container.resolve(CreateConversionService);

    const conversion = await createConversion.execute({
      user_id: user.id,
      from_wallet_id,
      percentual_rate,
      static_rate,
      to_wallet_id,
    });

    return response.status(201).json(conversion);
  }
}

export default ConversionsController;
