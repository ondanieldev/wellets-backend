interface ICurrenciesFromDocumentDTO {
  [key: string]: {
    name: string;
    code: string;
    symbol: string;
    format: string;
    exchange_rate: number;
    active: number;
    created_at: string;
    updated_at: {
      date: string;
      timezone_type: number;
      timezone: string;
    };
  };
}

export default ICurrenciesFromDocumentDTO;
