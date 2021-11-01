import { inject, injectable } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import ICurrenciesRepository from 'Modules/Currencies/Repositories/ICurrenciesRepository';
import Currency from 'Modules/Currencies/Infra/TypeORM/Entities/Currency';
import UserSettings from '../Infra/TypeORM/Entities/UserSettings';
import ICreateUserSettingsDTO from '../DTOs/ICreateUserSettingsDTO';
import IUserSettingsRepository from '../Repositories/IUserSettingsRepository';

@injectable()
class CreateUserSettingsService {
  constructor(
    @inject('UserSettingsRepository')
    private userSettingsRepository: IUserSettingsRepository,

    @inject('CurrenciesRepository')
    private currenciesRepository: ICurrenciesRepository,
  ) {}

  public async execute({
    user_id,
    currency_id,
  }: ICreateUserSettingsDTO): Promise<UserSettings> {
    const exists = await this.userSettingsRepository.findByUserId({ user_id });

    if (exists) {
      return exists;
    }

    let currency: Currency;

    if (currency_id) {
      currency = await this.currenciesRepository.findById(currency_id);
    } else {
      currency = await this.currenciesRepository.findByAcronym('USD');
    }

    if (!currency) {
      throw new AppError('Cannot find USD currency!', 404);
    }

    const userSettings = await this.userSettingsRepository.create({
      user_id,
      currency_id: currency.id,
    });

    return userSettings;
  }
}

export default CreateUserSettingsService;
