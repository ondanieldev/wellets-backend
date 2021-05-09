import IPaginationDTO from 'Shared/DTOs/IPaginationDTO';

interface IFindByUserIdDTO extends IPaginationDTO {
  user_id: string;
}

export default IFindByUserIdDTO;
