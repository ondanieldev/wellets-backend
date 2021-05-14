import ICreateCurrencyDTO from './ICreateCurrencyDTO';

interface IUpdateCurrencyDTO extends ICreateCurrencyDTO {
  id: string;
  user_id: string;
}

export default IUpdateCurrencyDTO;
