interface ICreateConversionDTO {
  from_wallet_id: string;
  to_wallet_id: string;
  static_rate?: number;
  percentual_rate?: number;
}

export default ICreateConversionDTO;
