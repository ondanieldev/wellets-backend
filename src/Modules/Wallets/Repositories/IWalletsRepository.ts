import Wallet from '../Infra/TypeORM/Entities/Wallet';
import ICreateWalletDTO from '../DTOs/ICreateWalletDTO';

interface IWalletsRepository {
  create(data: ICreateWalletDTO): Promise<Wallet>;
  findByUserIdAndAlias(
    user_id: string,
    alias: string,
  ): Promise<Wallet | undefined>;
}

export default IWalletsRepository;
