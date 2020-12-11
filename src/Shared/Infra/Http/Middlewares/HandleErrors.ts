import { Request, Response, NextFunction } from 'express';

import AppError from 'Shared/Errors/AppError';

class HandleErrors {
  public on(
    err: Error,
    request: Request,
    response: Response,
    _: NextFunction,
  ): Response {
    if (err instanceof AppError) {
      return response.status(err.status_code).json(err);
    }

    console.log(err);

    return response.status(500).json({
      status_code: 500,
      message: 'Oh no! We have a problem! Please, try again later.',
    });
  }
}

export default HandleErrors;
