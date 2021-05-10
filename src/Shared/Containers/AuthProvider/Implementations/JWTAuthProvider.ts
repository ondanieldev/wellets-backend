import { sign, verify, decode } from 'jsonwebtoken';

import AppError from 'Shared/Errors/AppError';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import AuthConfig from '../Config/AuthConfig';
import ITokenPayload from '../DTOS/ITokenPayload';
import IAuthProvider from '../Models/IAuthProvider';

class JWTAuthProvider implements IAuthProvider {
  public async generateToken(user: User): Promise<string> {
    const { secret, expiresIn } = AuthConfig.jwt;

    const token = sign({ id: user.id }, secret, {
      expiresIn,
      subject: user.id,
    });

    return token;
  }

  public async decodeToken(token: string): Promise<ITokenPayload> {
    const { secret } = AuthConfig.jwt;

    try {
      verify(token, secret);

      const payload = decode(token);

      return payload as ITokenPayload;
    } catch {
      throw new AppError('Invalid JWT token!', 401);
    }
  }
}

export default JWTAuthProvider;
