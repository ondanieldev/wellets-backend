import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import ITokenPayload from '../DTOS/ITokenPayload';

interface IAuthProvider {
  generateToken(payload: User): Promise<string>;
  decodeToken(token: string): Promise<ITokenPayload>;
}

export default IAuthProvider;
