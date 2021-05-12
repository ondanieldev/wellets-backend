import { container } from 'tsyringe';

import HashConfig from './Config/HashConfig';
import IHashProvider from './Models/IHashProvider';
import BCryptHashProvider from './Implementations/BCryptHashProvider';

const drivers = {
  bcrypt: BCryptHashProvider,
};

container.registerSingleton<IHashProvider>(
  'HashProvider',
  drivers[HashConfig.driver],
);
