import User from '../Infra/TypeORM/Entities/User';
import ICreateUserDTO from '../DTOs/ICreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
}

export default IUsersRepository;
