import User from '../Infra/TypeORM/Entities/User';
import ICreateUserDTO from '../DTOs/ICreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}

export default IUsersRepository;
