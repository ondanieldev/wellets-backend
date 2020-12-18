import { container } from 'tsyringe';

import IConversionsRepository from '../Repositories/IConversionsRepository';
import ConversionsRepository from '../Infra/TypeORM/Repositories/ConversionsRepository';

container.registerSingleton<IConversionsRepository>(
  'ConversionsRepository',
  ConversionsRepository,
);
