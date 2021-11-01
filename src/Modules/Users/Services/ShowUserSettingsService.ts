import AppError from 'Shared/Errors/AppError';
import { inject, injectable } from 'tsyringe';

import UserSettings from '../Infra/TypeORM/Entities/UserSettings';
import IUserSettingsRepository from '../Repositories/IUserSettingsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowUserSettingsService {
  constructor(
    @inject('UserSettingsRepository')
    private userSettingsRepository: IUserSettingsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<UserSettings> {
    const userSettings = await this.userSettingsRepository.findByUserId({
      user_id,
    });

    if (!userSettings) {
      throw new AppError('User settings not found!', 404);
    }

    return userSettings;
  }
}

export default ShowUserSettingsService;
