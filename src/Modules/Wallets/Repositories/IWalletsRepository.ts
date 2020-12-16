import Wallet from '../Infra/TypeORM/Entities/Wallet';
import ICreateWalletDTO from '../DTOs/ICreateWalletDTO';

interface IWalletsRepository {
  create(data: ICreateWalletDTO): Promise<Wallet>;
  findByUserIdAndAlias(
    user_id: string,
    alias: string,
  ): Promise<Wallet | undefined>;
  findByUserId(user_id: string): Promise<Wallet[]>;
  findById(id: string): Promise<Wallet | undefined>;
  delete(id: string): Promise<void>;
}

export default IWalletsRepository;
