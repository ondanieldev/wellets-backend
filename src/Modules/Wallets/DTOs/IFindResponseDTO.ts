import Wallet from '../Infra/TypeORM/Entities/Wallet';

interface IFindResponseDTO {
  wallets: Wallet[];
  total: number;
}

export default IFindResponseDTO;
