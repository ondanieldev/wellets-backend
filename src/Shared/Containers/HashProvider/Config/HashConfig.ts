interface IHashConfig {
  driver: 'bcrypt';
  bcrypt: {
    salt: number;
  };
}

export default {
  driver: process.env.HASH_DRIVER,
  bcrypt: {
    salt: 8,
  },
} as IHashConfig;
