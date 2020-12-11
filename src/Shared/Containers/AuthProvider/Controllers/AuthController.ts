import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import AuthService from '../Services/AuthService';

class AuthController {
  public async on(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const { authorization } = request.headers;

    const auth = container.resolve(AuthService);

    const user = await auth.execute(authorization);

    request.user = user;

    next();
  }
}

export default AuthController;
