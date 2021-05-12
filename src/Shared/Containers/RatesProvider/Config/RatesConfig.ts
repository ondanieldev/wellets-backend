interface IRatesConfig {
  driver: 'openexchange';
  openexchange: {
    id: string;
    url: string;
  };
}

export default {
  driver: process.env.RATES_DRIVER,
  openexchange: {
    id: process.env.RATES_OPENEXCHANGE_ID,
    url: 'https://openexchangerates.org/api',
  },
} as IRatesConfig;
