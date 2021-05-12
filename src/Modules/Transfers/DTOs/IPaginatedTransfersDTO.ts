import Transfer from '../Infra/TypeORM/Entities/Transfer';

interface IPaginatedTransfersDTO {
  transfers: Transfer[];
  total: number;
}

export default IPaginatedTransfersDTO;
