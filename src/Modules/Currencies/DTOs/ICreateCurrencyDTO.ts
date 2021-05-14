interface ICreateCurrencyDTO {
  acronym: string;
  alias: string;
  format: string;
  dollar_rate: number;
  user_id?: string;
}

export default ICreateCurrencyDTO;
