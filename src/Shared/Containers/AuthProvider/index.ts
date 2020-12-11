import { container } from 'tsyringe';

import AuthConfig from './Config/AuthConfig';
import IAuthProvider from './Models/IAuthProvider';
import JWTAuthProvider from './Implementations/JWTAuthProvider';

const drivers = {
  jwt: JWTAuthProvider,
};

container.registerSingleton<IAuthProvider>(
  'AuthProvider',
  drivers[AuthConfig.driver],
);
