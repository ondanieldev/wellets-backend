import IPaginationDTO from 'Shared/DTOs/IPaginationDTO';

interface IFindByWalletIdDTO extends IPaginationDTO {
  wallet_id: string;
}

export default IFindByWalletIdDTO;
