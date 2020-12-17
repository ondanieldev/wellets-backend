import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '../../../Services/AuthenticateUserService';
import SignOutUserService from '../../../Services/SignOutUserService';

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

  public async delete(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { id } = request.user;

    const signOutUser = container.resolve(SignOutUserService);

    await signOutUser.execute(id);

    return response.status(204).json();
  }
}

export default SessionsController;
