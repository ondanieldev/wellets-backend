import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import ShowUserSettingsService from 'Modules/Users/Services/ShowUserSettingsService';
import UpdateUserSettingsService from 'Modules/Users/Services/UpdateUserSettingsService';
import CreateUserSettingsService from 'Modules/Users/Services/CreateUserSettingsService';

class UserSettingsController {
  public async show(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { id } = request.user;

    const showUserSettings = container.resolve(ShowUserSettingsService);

    const userSettings = await showUserSettings.execute({
      user_id: id,
    });

    return response.json(userSettings);
  }

  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user } = request;
    const { currency_id } = request.body;

    const createUserSettings = container.resolve(CreateUserSettingsService);

    const userSettings = await createUserSettings.execute({
      user_id: user.id,
      currency_id,
    });

    return response.json(userSettings);
  }

  public async update(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user } = request;
    const { currency_id } = request.body;

    const updateUserSettings = container.resolve(UpdateUserSettingsService);

    const userSettings = await updateUserSettings.execute({
      user_id: user.id,
      currency_id,
    });

    return response.json(userSettings);
  }
}

export default UserSettingsController;
