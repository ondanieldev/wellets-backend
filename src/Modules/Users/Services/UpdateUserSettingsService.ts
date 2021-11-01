import { inject, injectable } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import ICurrenciesRepository from 'Modules/Currencies/Repositories/ICurrenciesRepository';
import UserSettings from '../Infra/TypeORM/Entities/UserSettings';
import IUpdateUserSettingsDTO from '../DTOs/IUpdateUserSettingsDTO';
import IUserSettingsRepository from '../Repositories/IUserSettingsRepository';

@injectable()
class UpdateUserSettingsService {
  constructor(
    @inject('UserSettingsRepository')
    private userSettingsRepository: IUserSettingsRepository,

    @inject('CurrenciesRepository')
    private currenciesRepository: ICurrenciesRepository,
  ) {}

  public async execute({
    user_id,
    currency_id,
  }: IUpdateUserSettingsDTO): Promise<UserSettings> {
    const userSettings = await this.userSettingsRepository.findByUserId({
      user_id,
    });

    if (!userSettings) {
      throw new AppError('Cannot find user settings!', 404);
    }

    const currency = await this.currenciesRepository.findById(currency_id);

    if (!currency) {
      throw new AppError('Cannot find currency!', 404);
    }

    userSettings.currency_id = currency_id;
    userSettings.currency = currency;

    await this.userSettingsRepository.save(userSettings);

    return userSettings;
  }
}

export default UpdateUserSettingsService;
