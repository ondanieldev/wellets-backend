import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '../../../Services/AuthenticateUserService';

class SessionsController {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { password, email } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const user = await authenticateUser.execute({
      email,
      password,
    });

    return response.status(201).json(classToClass(user));
  }
}

export default SessionsController;
