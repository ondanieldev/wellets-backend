import UserSettings from '../Infra/TypeORM/Entities/UserSettings';
import IFindByUserIdDTO from '../DTOs/IFindByUserIdDTO';
import ICreateUserSettingsDTO from '../DTOs/ICreateUserSettingsDTO';

interface IUserSettingsRepository {
  findById(id: string): Promise<UserSettings | undefined>;
  findByUserId(data: IFindByUserIdDTO): Promise<UserSettings | undefined>;
  create(data: ICreateUserSettingsDTO): Promise<UserSettings>;
  save(userSettings: UserSettings): Promise<UserSettings>;
}

export default IUserSettingsRepository;
